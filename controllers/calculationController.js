const idx = require('idx')
const Calculation = require('../models/Calculation')
const calculationsService = require('../services/calculationsService')
const pusherService = require('../services/pusherService')
const { INVALID_CALCULATION_ERROR, CALCULATION_REQUIRED_ERROR, INTERNAL_ERROR, PUSHER_CALCULATIONS_CHANNEL, PUSHER_CALCULATIONS_EVENT } = require('../constants')

const getLatest10 = async (req, res) => {
  try {
    const calculations = await calculationsService.getCalculations({sort: '-createdAt'})
    return res.json({ calculations })
  } catch (err) {
    console.error(err)
    return res.status(500).send(INTERNAL_ERROR)
  }
}

const post = async (req, res) => {
  const { calculation = '' } = req.body
  try {
    await Calculation.create({calculation})
    const latestCalculations = await calculationsService.getCalculations({sort: '-createdAt'})
    pusherService.push({channel: PUSHER_CALCULATIONS_CHANNEL, event: PUSHER_CALCULATIONS_EVENT, payload: latestCalculations})
    return res.sendStatus(201)
  } catch (err) {
    const calculationErrorMsg = idx(err, _ => _.errors.calculation.message)
    if (calculationErrorMsg) {
      if (calculationErrorMsg === INVALID_CALCULATION_ERROR || calculationErrorMsg === CALCULATION_REQUIRED_ERROR) {
        return res.status(400).json(`Error: ${calculationErrorMsg}`)
      }
    }
    return res.status(500).send(INTERNAL_ERROR)
  }
}

module.exports = {
  getLatest10,
  post
}
