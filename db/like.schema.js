const mongoose = require('mongoose')
const { Schema } = mongoose

const likeSchema = new mongoose.Schema({
  chatId: Number,
  likedAlbums: [Number],
}, {
  versionKey: false,
  timestamps: true,
})

const Likes = mongoose.model('likes', likeSchema, 'likes')

module.exports = Likes