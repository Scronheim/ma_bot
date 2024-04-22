const mongoose = require('mongoose')
const { Schema } = mongoose

const countrySchema = new mongoose.Schema({
  name: String,
  code: String,
}, {
  versionKey: false,
  timestamps: true,
})

countrySchema.plugin(require('mongoose-autopopulate'))
const Country = mongoose.model('countries', countrySchema, 'countries')

module.exports = Country