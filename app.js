const express = require('express')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cors = require('cors')

require('dotenv').config()

const app = express()

const allowedOrigins = [
  'https://realtime-calculator-bhunt.herokuapp.com'
]
app.use(cors({
  origin: (origin, cb) => {
    if (!origin || process.env.NODE_ENV === 'development') return cb(null, true)
    if (allowedOrigins.indexOf(origin) === -1) {
      return cb(new Error('CORS restricted for specified origin'), false)
    }
    return cb(null, true)
  }
}))

const { init: initDB } = require('./services/mongooseService')
initDB()
const routes = require('./routes')
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/', routes)
// app.use('/users', users)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500)
})

module.exports = app
