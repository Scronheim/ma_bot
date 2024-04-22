const mongoose = require('mongoose')
const { Schema } = mongoose

const bandSchema = new mongoose.Schema({
  name: String,
  country: {
    type: Schema.Types.ObjectId,
    ref: 'countries',
    autopopulate: true,
  },
}, {
  versionKey: false,
  timestamps: true,
})

bandSchema.plugin(require('mongoose-autopopulate'))
const Bands = mongoose.model('band', bandSchema, 'band')

module.exports = Bands