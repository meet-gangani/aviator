const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')
const { Schema } = mongoose
const { defaultFields, defaultSchemaOptions } = require('./model-utils')

const userSchema = new Schema({
  _id: { type: Schema.Types.String, required: true, default: uuidv4 },
  username: { type: Schema.Types.String, required: true },
  email: { type: Schema.Types.String, required: true },
  wallet: { type: Schema.Types.Number, required: true, default: 0 },
  password: { type: Schema.Types.String, required: true },
  phone: { type: Schema.Types.String, required: true },
  status: { type: Schema.Types.String, enum: [ 'ACTIVE', 'INACTIVE' ], required: true },
  ...defaultFields
}, {
  ...defaultSchemaOptions
})

const user = mongoose.model('user', userSchema, 'users')

module.exports = user