const ObjectID = require('mongodb').ObjectID
const { startCase } = require('lodash')
const utils = require('../stores/utils')
const models = require('../models')
const moment = require('moment')

class BaseModel {
  constructor(storeName) {
    const modelName = startCase(storeName).replace(/\s+/g, '')

    this.model = models[modelName]
    this.collectionName = this.model?.collection?.name
  }

  async upsert(query, objectToCreate) {
    try {
      // TODO: remove findOneAndUpdate
      return this.model.findOneAndUpdate(query, { $set: objectToCreate }, { upsert: true })
    } catch (exception) {
      utils.throwError(500, '', `Error creating ${this.collectionName}`)(exception)
    }
  }

  async getById(id, projection) {
    try {
      let query = {
        _id: id
      }

      let entityInfo
      if (projection) {
        entityInfo = await this.model.findOne(query).select(projection).lean(true)
      } else {
        entityInfo = await this.model.findOne(query).lean(true)
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
        return await this.model.findOne(query).select(projection).lean(true)
      }

      return await this.model.findOne(query).lean(true)
    } catch (exception) {
      utils.throwError(500, '', `Error getting by id ${this.collectionName}`)(exception)
    }
  }

  async getAll(query = {}, projection, sort, paginationOption, limit, excludeMarkedAsDeleted = true) {
    try {
      if (excludeMarkedAsDeleted) {
        query = {
          ...query,
          markedAsDeleted: {
            $in: [ null, false ]
          }
        }
      }

      const queryObj = this.model.find(query).lean(true)

      if (projection) {
        queryObj.select(projection)
      }

      if (sort) {
        queryObj.sort(sort)
      }

      if (limit) {
        queryObj.limit(limit)
      }

      if (paginationOption) {
        const pageSize = paginationOption.pageSize
        const pageNo = paginationOption.pageNo
        queryObj.skip((pageNo - 1) * pageSize).limit(pageSize)
      }

      return await queryObj.exec()
    } catch (exception) {
      utils.throwError(500, '', `Error getting ${this.collectionName}`)(exception)
    }
  }

  async get(query = {}, projection) {
    try {
      if (projection) {
        return await this.model.findOne(query).select(projection).lean(true)
      }

      return await this.model.findOne(query).lean(true)
    } catch (exception) {
      utils.throwError(500, '', `Error getting ${this.collectionName}`)(exception)
    }
  }

  async delete(id) {
    try {
      return await this.model.deleteOne({ _id: id })
    } catch (exception) {
      utils.throwError(500, '', `Error deleting ${this.collectionName}`)(exception)
    }
  }

  async deleteByWhere(where) {
    try {
      return await this.model.deleteMany(where)
    } catch (exception) {
      utils.throwError(500, '', `Error deleting ${this.collectionName}`)(exception)
    }
  }

  async save(modelData) {
    try {
      const model = this.model(modelData)
      return await model.save()
    } catch (exception) {
      utils.throwError(500, '', `Error saving ${this.collectionName}`)(exception)
    }
  }

  async insertMany(data) {
    try {
      return await this.model.insertMany(data)
    } catch (exception) {
      utils.throwError(500, '', `Error inserting ${this.collectionName}`)(exception)
    }
  }

  async update(id, whatToUpdate, whatDoDelete) {
    try {
      let query = {
        _id: id
      }

      const existingEntity = await this.get(query)

      if (!existingEntity) {
        query = {
          _id: new ObjectID(id)
        }
      }

      if (whatToUpdate) {
        delete whatToUpdate._id
      }

      return await this.updateByWhere(query, whatToUpdate, whatDoDelete)
    } catch (exception) {
      utils.throwError(500, '', `Error updating ${this.collectionName}`)(exception)
    }
  }

  async updateByWhere(query, whatToUpdate, whatDoDelete) {
    try {
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

      return await this.model.updateOne(query, newChanges)
    } catch (exception) {
      utils.throwError(500, '', `Error updating data in ${this.collectionName}`)(exception)
    }
  }

  async updateMany(query, whatToUpdate, whatDoDelete) {
    try {
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

      return await this.model.updateMany(query, newChanges)
    } catch (exception) {
      utils.throwError(500, '', `Error updating multiple data in ${this.collectionName}`)(exception)
    }
  }

  async count(query) {
    try {
      return await this.model.count(query)
    } catch (exception) {
      utils.throwError(500, '', `Error getting count total ${this.model}`)(exception)
    }
  }
}

module.exports = BaseModel