const mongoose = require('mongoose')

const init = () => {
  const mongoURI = process.env.MONGO_DB_URI
  mongoose.connect(mongoURI, { autoIndex: false })
  mongoose.Promise = global.Promise
  const connection = mongoose.connection

  connection
    .then(db => {
      console.log('Successfully connected to MongoDB')
    })
    .catch(err => {
      console.error('Mongo DB connection error: ', err)
    })
}

module.exports = { init }
