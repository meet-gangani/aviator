const TaskSocketStore = require('./task.store')
const { TaskStore, utils } = require('../stores')
const { TASK_STATUS } = require('../stores/SmartTaskEnum')
const groupBy = require('lodash/groupBy')

class TaskSocket {
  // This object will contain all the channels and users connected to that channel
  // Channel will be either customer_id or room name.
  // When user connects from Tasks page, channel will be ROOM. When user connects from Edit Customer -> Tasks page, channel will be customer_id
  static socketChannels = {} // {'SMART_TASKS': ['1', '2'], 'Customer_ID_1': ['3', '4'], 'Customer_ID_2': ['5']}
  static ROOM = 'SMART_TASKS'

  static onConnect(mongoDbDatabase, io, socket, data) {
    // Save socket.id to specific channel
    // i.e. either general channel (Tasks page) or customer specific channel (i.e. Edit Customer -> Tasks page)
    const socketChannelKey = data.customerId || data.room
    this.socketChannels[socketChannelKey] = (this.socketChannels[socketChannelKey] || []).concat([ socket.id ])

    socket.on('INIT_SMART_TASKS', async (data, callback) => {
      utils.logMessage('INIT_SMART_TASKS called', data)

      try {
        const isUpdated = await this.refreshTasksData(mongoDbDatabase, io)

        // If we have already published the data to channel then we don't need to do it again so skip it
        if (!isUpdated) {
          const key = data.customerId || this.ROOM
          const currentUserChannel = { [key]: this.socketChannels[key] }
          this.publicTasksTo(io, currentUserChannel, 'SMART_TASKS', TaskSocketStore.getTasks())
          this.publicTasksTo(io, currentUserChannel, 'COMPLETED_SMART_TASKS', TaskSocketStore.getCompletedTasks())
        }
      } catch (e) {
        utils.logError('Error while INIT_SMART_TASKS event', e)
        callback(e)
      }
    })

    socket.on('INIT_UPDATE_TASK', async ({ taskId }, callback) => {
      utils.logMessage('INIT_UPDATE_TASK called')

      try {
        const task = await TaskStore.getById(taskId)
        TaskSocketStore.updateTask(task)
        io.to(this.ROOM).emit('UPDATED_TASK', task)
      } catch (e) {
        utils.logError('Error while INIT_UPDATE_TASK event', e)
        callback(e)
      }
    })
  }

  static async refreshTasksData(mongoDbDatabase, io) {
    try {
      if (!TaskSocketStore.isTasksUpdated()) {
        return false
      }

      let query = {
        status: {
          $in: [ TASK_STATUS.PENDING, TASK_STATUS.ASSIGNED ]
        },
        deadline: {
          $exists: true
        }
      }

      const tasks = await TaskStore.getAll(query)
      TaskSocketStore.setTasks(tasks)
      this.publicTasksTo(io, this.socketChannels, 'SMART_TASKS', tasks)

      query = {
        status: {
          $in: [ TASK_STATUS.COMPLETED ]
        },
        deadline: {
          $exists: true
        }
      }

      const completedTasks = await TaskStore.getAll(query)
      TaskSocketStore.setCompletedTasks(completedTasks)
      this.publicTasksTo(io, this.socketChannels, 'COMPLETED_SMART_TASKS', completedTasks)
      return true
    } catch (e) {
      utils.logError('Error while refreshTasksData called', e)
    }

    return false
  }

  static publicTasksTo(io, socketChannels, event, tasks) {
    // Grouping tasks by customer
    const groupedTasks = groupBy(tasks, (task) => task.userId)

    // Loop over all the channels and emitting relative data to each channels' users
    for (const socketChannel of Object.keys(socketChannels)) {
      // If this channel is general channel then send all tasks i.e. it is created from Tasks page
      if (socketChannel === this.ROOM) {
        // if this function is called for COMPLETED_SMART_TASK event then skip it for general channel as we dont
        // display completed tasks on Tasks page
        if (event === 'COMPLETED_SMART_TASKS') {
          continue
        }

        // Loop over each user of this channel and emit all tasks as its general channel
        socketChannels[socketChannel].forEach((socketId) => {
          io.to(socketId).emit(event, tasks || [])
        })
      } else {
        // Loop over each user of this channel and emit ONLY TASKS related to this channel i.e. Edit Customer -> Tasks page
        socketChannels[socketChannel].forEach((socketId) => {
          io.to(socketId).emit(event, groupedTasks[socketChannel] || [])
        })
      }
    }
  }
}

module.exports = TaskSocket
