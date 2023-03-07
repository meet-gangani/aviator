const ObjectID = require('mongodb').ObjectID
const moment = require('moment')
const utils = require('./utils')

class BaseModel {
  constructor(name) {
    this.model = name
  }

  async create(mongoDbDatabase, id, objectToCreate) {
    try {
      objectToCreate._id = id

      if (!objectToCreate.createdOn) {
        objectToCreate.createdOn = moment().valueOf()
      }

      return await mongoDbDatabase.collection(this.model).insertOne(objectToCreate)
    } catch (exception) {
      utils.throwError(500, '', `Error creating ${this.model}`)(exception)
    }
  }

  async createMany(mongoDbDatabase, objectsToCreate) {
    try {
      const currentTime = moment().valueOf()

      objectsToCreate = objectsToCreate.map((objectToCreate) => {
        if (!objectToCreate.createdOn) {
          objectToCreate.createdOn = currentTime
        }

        return objectToCreate
      })

      return await mongoDbDatabase.collection(this.model).insertMany(objectsToCreate)
    } catch (exception) {
      utils.throwError(500, '', `Error creating ${this.model}`)(exception)
    }
  }

  async update(mongoDbDatabase, id, whatToUpdate, whatDoDelete) {
    try {
      let query = {
        _id: id
      }

      const existingEntity = await this.get(mongoDbDatabase, query)
      if (!existingEntity) {
        query = {
          _id: new ObjectID(id)
        }
      }

      if (whatToUpdate) {
        delete whatToUpdate._id
      }

      return await this.updateByWhere(mongoDbDatabase, query, whatToUpdate, whatDoDelete)
    } catch (err) {
      utils.throwError(500, '', `Error updating ${this.model}`)(err)
    }
  }

  async updateByWhere(mongoDbDatabase, query, whatToUpdate, whatDoDelete) {
    try {
      if ((!whatToUpdate || Object.keys(whatToUpdate).length <= 0)
          && (!whatDoDelete || Object.keys(whatDoDelete).length <= 0)) {
        return {}
      }

      let newChanges = {
        $set: {
          updatedOn: moment().valueOf(),
          ...(whatToUpdate || {})
        }
      }

      if (whatDoDelete && Object.keys(whatDoDelete).length > 0) {
        newChanges = {
          ...newChanges,
          $unset: {
            ...whatDoDelete
          }
        }
      }

      return await mongoDbDatabase.collection(this.model).updateOne(query, newChanges)
    } catch (err) {
      utils.throwError(500, '', `Error updating ${this.model}`)(err)
    }
  }

  async upsert(mongoDbDatabase, query, objectToCreate) {
    try {
      return await mongoDbDatabase.collection(this.model).updateOne(query, { $set: objectToCreate }, { upsert: true })
    } catch (exception) {
      return utils.throwError(500, '', `Error upsert ${this.model}`)(exception)
    }
  }

  async delete(mongoDbDatabase, id) {
    try {
      await mongoDbDatabase.collection(this.model).deleteOne({ _id: id })
    } catch (exception) {
      utils.throwError(500, '', `Error deleting ${this.model}`)(exception)
    }
  }

  async deleteByWhere(mongoDbDatabase, where) {
    try {
      await mongoDbDatabase.collection(this.model).deleteMany(where)
    } catch (exception) {
      utils.throwError(500, '', `Error deleting ${this.model}`)(exception)
    }
  }

  async getById(mongoDbDatabase, id, projection) {
    try {
      let query = {
        _id: id
      }

      let entityInfo
      if (projection) {
        entityInfo = await mongoDbDatabase.collection(this.model).findOne(query, { projection })
      } else {
        entityInfo = await mongoDbDatabase.collection(this.model).findOne(query)
      }

      if (entityInfo) {
        return entityInfo
      }

      try {
        id = new ObjectID(id)
      } catch (error) {
        return null
      }

      query = {
        _id: id
      }

      if (projection) {
        return await mongoDbDatabase.collection(this.model).findOne(query, { projection })
      }

      return await mongoDbDatabase.collection(this.model).findOne(query)
    } catch (exception) {
      utils.throwError(500, '', `Error getting by id ${this.model}`)(exception)
    }
  }

  async get(mongoDbDatabase, query = {}, projection) {
    try {
      if (projection) {
        return await mongoDbDatabase.collection(this.model).findOne(query, { projection })
      }

      return await mongoDbDatabase.collection(this.model).findOne(query)
    } catch (exception) {
      utils.throwError(500, '', `Error getting ${this.model}`)(exception)
    }
  }

  async getAll(mongoDbDatabase, query = {}, projection, sort, paginationOption, limit, excludeMarkedAsDeleted = true) {
    try {
      if (excludeMarkedAsDeleted) {
        query = {
          ...query,
          markedAsDeleted: {
            $in: [ null, false ]
          }
        }
      }

      let cursor = await mongoDbDatabase.collection(this.model).find(query)

      if (projection) {
        cursor = cursor.project(projection)
      }

      if (sort) {
        cursor = cursor.sort(sort)
      }

      if (limit) {
        cursor = cursor.limit(limit)
      }

      if (paginationOption) {
        const pageSize = paginationOption.pageSize
        const pageNo = paginationOption.pageNo
        cursor = cursor.skip((pageNo - 1) * pageSize).limit(pageSize)
      }

      const results = await cursor.toArray()
      cursor.close()
      return results
    } catch (exception) {
      utils.throwError(500, '', `Error retrieving all ${this.model}`)(exception)
    }
  }

  async count(mongoDbDatabase, query = {}) {
    try {
      return await mongoDbDatabase.collection(this.model).countDocuments(query)
    } catch (exception) {
      utils.throwError(500, '', `Error getting count total ${this.model}`)(exception)
    }
  }

  async updateMany(mongoDbDatabase, query, whatToUpdate) {
    try {
      if ((!whatToUpdate || Object.keys(whatToUpdate).length <= 0)
          && (!whatDoDelete || Object.keys(whatDoDelete).length <= 0)) {
        return {}
      }
      const newChanges = {
        $set: {
          updatedOn: moment().valueOf(),
          ...(whatToUpdate || {})
        }
      }
      return await mongoDbDatabase.collection(this.model).updateMany(query, newChanges)
    } catch (err) {
      utils.throwError(500, `Error updating ${this.model}`)(err)
    }
  }
}

module.exports = BaseModel