const mongoose = require('mongoose')
const { INVALID_CALCULATION_ERROR, CALCULATION_REQUIRED_ERROR } = require('../constants')

const Schema = mongoose.Schema

const CalculationSchema = new Schema({
  calculation: {
    type: String,
    trim: true,
    required: [true, CALCULATION_REQUIRED_ERROR],
    validate: {
      validator: v => /([-0-9.])+([*-+/])([-0-9.])+=([-0-9.])+/g.test(v),
      message: INVALID_CALCULATION_ERROR
    }
  }

}, { timestamps: {
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
}})

module.exports = mongoose.model('Calculation', CalculationSchema)
