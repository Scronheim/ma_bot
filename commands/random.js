const { getRandomBand } = require('./searchBand')
const { parseBandInfo, parseDiscography, buildKeyboardDiscography, replyBandWithPhoto } = require('../callbackQuery')

exports.randomBand = async (ctx) => {
  const { data } = await getRandomBand()
  const { id, name, genre, country, location, themes, status, label, formYear, photoUrl } = parseBandInfo(data)
  const discography = await parseDiscography(id)
  const inlineKeyboard = buildKeyboardDiscography(discography)

  const band = {
    name, genre, country, location, themes, status, label, formYear, photoUrl
  }

  replyBandWithPhoto(ctx, band, inlineKeyboard)
}
