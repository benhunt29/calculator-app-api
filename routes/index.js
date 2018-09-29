const router = require('express').Router()
const calculations = require('./calculation')

calculations(router)
module.exports = router
