const CalculationController = require('../controllers/calculationController')

module.exports = api => {
  api.route('/calculations').get(CalculationController.getLatest10)
  api.route('/calculations').post(CalculationController.post)
}
