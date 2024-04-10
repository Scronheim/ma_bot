const db = require('./index.schema')

const Like = db.like

exports.toggleLike = async (ctx, albumId) => {
  const chatId = ctx.update.callback_query.from.id
  const chatIdLikes = await Like.findOne({ chatId })
  if (chatIdLikes) {
    if (chatIdLikes.likedAlbums.includes(albumId)) {
      const albumIndex = chatIdLikes.likedAlbums.findIndex(a => a === albumId)
      chatIdLikes.likedAlbums.splice(albumIndex, 1)
      await chatIdLikes.save()
      await ctx.answerCbQuery('Отметка нравится убрана')
    } else {
      chatIdLikes.likedAlbums.push(albumId)
      await chatIdLikes.save()
      await ctx.answerCbQuery('Отметка нравится установлена')
    }
  } else {
    const newLike = new Like({ chatId, likedAlbums: [albumId] })
    await newLike.save()
    await ctx.answerCbQuery('Отметка нравится установлена')
  }
}

exports.checkLikedAlbum = async (ctx, albumId) => {
  const chatId = ctx.update.callback_query ? ctx.update.callback_query.from.id : ctx.update.message.from.id
  const chatIdLikes = await Like.findOne({ chatId })
  if (chatIdLikes) return !!chatIdLikes.likedAlbums.includes(albumId)
  return false
}