const mongoose = require('mongoose')

const { Schema } = mongoose

const defaultFields = {
  createdOn: { type: Schema.Types.Number },
  updatedOn: { type: Schema.Types.Number }
}

const defaultSchemaOptions = {
  timestamps: {
    createdAt: 'createdOn',
    updatedAt: 'updatedOn'
  },
  versionKey: false // TODO: Currently disabling it but we need to check later of possibility to enable it
}

const defaultDynamicSchemaOptions = {
  ...defaultSchemaOptions,
  strict: false
}

const defaultSubSchemaOptions = {
  _id: false,
  timestamps: false,
  versionKey: false // TODO: Currently disabling it but we need to check later of possibility to enable it
}

module.exports = { defaultFields, defaultSchemaOptions, defaultDynamicSchemaOptions, defaultSubSchemaOptions }