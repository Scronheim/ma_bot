const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const db = {}

db.mongoose = mongoose
db.like = require('./like.schema')
db.band = require('./band.schema')
db.country = require('./country.schema')

module.exports = db
