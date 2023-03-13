const axios = require('axios')
const utils = require('../stores/utils')
const constants = require('../global/index')

// This will be set to true when its executing from server and when its executing from cronjob, it will be false
let IS_SERVER = false

// Tasks cache, from which all the clients will be served
const TASKS = []
const COMPLETED_TASKS = []

// This flag will be used to identify if we need to fetch the latest data from database or we can use TASKS cache
let MARK_FOR_UPDATE = true

exports.setIsServer = (isServer) => {
  IS_SERVER = isServer
}

exports.setTasks = (tasks) => {
  // Removing all the elements
  TASKS.splice(0, TASKS.length)
  tasks.forEach((task) => TASKS.push(task))
  MARK_FOR_UPDATE = false
}

exports.getTasks = () => {
  return TASKS
}

exports.setCompletedTasks = (completedTasks) => {
  // Removing all the elements
  COMPLETED_TASKS.splice(0, COMPLETED_TASKS.length)
  completedTasks.forEach((task) => COMPLETED_TASKS.push(task))
  MARK_FOR_UPDATE = false
}

exports.getCompletedTasks = () => {
  return COMPLETED_TASKS
}

exports.setTasksUpdated = async (taskUpdated) => {
  console.log(`IS_SERVER ${IS_SERVER}`)

  // If this method is called from server, then we will already have the shared value so we will use that
  if (IS_SERVER) {
    MARK_FOR_UPDATE = taskUpdated
    return
  }

  // If this method is called from cronjob etc, at that point we need to tell server to reload the data for all clients so we are calling api for that
  try {
    const response = await axios.get(`${constants.apiUrl}/tasks/refresh`)
    utils.logMessage(`${constants.apiUrl}/tasks/refresh response`, response.body)
  } catch (e) {
    utils.logError(`${constants.apiUrl}/tasks/refresh error`, e)
  }
}

exports.isTasksUpdated = () => {
  return MARK_FOR_UPDATE
}

exports.updateTask = (task) => {
  const index = TASKS.findIndex((t) => t._id === task._id)
  if (index > -1) {
    TASKS.splice(index, 1)
  }

  const completedTaskIndex = COMPLETED_TASKS.findIndex((t) => t._id === task._id)
  if (completedTaskIndex > -1) {
    COMPLETED_TASKS.splice(completedTaskIndex, 1)
  }

  if (task.status === 'ASSIGNED' || task.status === 'PENDING') {
    TASKS.push(task)
  } else if (task.status === 'COMPLETED') {
    COMPLETED_TASKS.push(task)
  }
}
