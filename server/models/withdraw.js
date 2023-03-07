const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')
const { Schema } = mongoose
const { defaultFields, defaultSchemaOptions } = require('./model-utils')

const WithdrawSchema = new Schema({
  _id: { type: Schema.Types.String, required: true, default: uuidv4 },
  userId: { type: Schema.Types.String, required: true },
  amount: { type: Schema.Types.Number, required: true },
  status: { type: Schema.Types.String, enum: [ 'PENDING', 'COMPLETED' ], required: true, default: 'PENDING' },
  ...defaultFields
}, {
  ...defaultSchemaOptions
})

const withdraw = mongoose.model('withdraw', WithdrawSchema, 'withdraws')

module.exports = withdraw