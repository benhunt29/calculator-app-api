const Calculation = require('../models/Calculation')

const getCalculations = async ({find = { }, limit = 10, sort = {}} = {}) => {
  const calculations = await Calculation.find(find).limit(limit).sort(sort)
  return calculations.map((item) => {
    const { calculation, createdAt } = item
    return { calculation, createdAt }
  })
}

module.exports = {
  getCalculations
}
