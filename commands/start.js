const { searchBand } = require('./searchBand')
const { answerWithAlbum } = require('../callbackQuery')

exports.start = async (ctx) => {
  const request = ctx.update.message.text.split('/start ')[1]
  if (request) {
    const temp = request.split('__')
    const bandName = temp[0].replaceAll('_', ' ')

    if (bandName) {
      ctx.update.message.text = bandName
      return await searchBand(ctx)
    }
  }
  return ctx.reply('Введите название группы, что бы получить информацию')
}
