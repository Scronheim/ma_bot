const axios = require('axios')
const { Markup } = require('telegraf')

const { getBand } = require('./commands/searchBand')
const { getAlbumbyId } = require('./commands/searchAlbum')

const { toggleLike, checkLikedAlbum } = require('./db/like')

const { genres, WEB_URL, API_URL } = require('./utils/const')
const { getFormattedBandText } = require('./utils/helpers')


const NO_IMAGE_URL = 'https://business-click.it/images/portfolio/cappelledelcommiatofirenze.png'


exports.callbackQuery = async (ctx) => {
  const data = ctx.update.callback_query.data.split('|')
  const action = data[0]
  const firstParameter = data[1]

  switch (action) {
    case 'getBand':
      await getBandById(ctx, firstParameter)
      break
    case 'getSavedBand':
      await answerWithBand(ctx, ctx.session.currentBand, false)
      break
    case 'getAlbum':
      await answerWithAlbum(ctx, firstParameter)
      break
    case 'repeatRandomBand':
      await answerWithRepeatedRandomBand(ctx)
      break
    case 'like':
      await toggleLike(ctx, firstParameter)
      break
    default:
      break
  }

  await ctx.answerCbQuery()
}

async function answerWithRepeatedRandomBand(ctx) {
  const [randomBand] = await queryRandomBand(ctx)
  await answerWithBand(ctx, randomBand)
}

async function queryRandomBand(ctx) {
  const genre = ctx.session.subGenre === '' ? '' : genres[ctx.session.subGenre]
  const country = ctx.session.country
  const status = ctx.session.bandStatus
  const band = await firstRequest(genre, country, status)

  return band
}

async function answerWithAlbum(ctx, albumId) {
  const album = ctx.session.currentBand.albums.find(album => album._id === albumId)
  replyAlbumWithPhoto(ctx, album)
}

async function getBandById(ctx, bandId) {
  const { data } = await getBand(bandId)
  await answerWithBand(ctx, data.data, false)
}

async function answerWithBand(ctx, band, isRandom = true) {
  const inlineKeyboard = await buildKeyboardDiscography(band)

  if (band.socials) {
    if (band.socials.bandcamp) inlineKeyboard.push([Markup.button.url(`Bandcamp`, band.socials.bandcamp)])
  }

  if (isRandom) inlineKeyboard.push([Markup.button.callback(`Повторить`, `repeatRandomBand`)])
  ctx.session.currentBand = band
  replyBandWithPhoto(ctx, band, inlineKeyboard)
}

function replyAlbumWithPhoto(ctx, album) {
  const cover = album.cover ? album.cover : NO_IMAGE_URL
  const inlineKeyboard = [
    [Markup.button.callback(`⬅️ к альбомам`, `getSavedBand`)],
  ]

  if (album.tracks.length > 22) {
    album.tracks.splice(22, album.tracks.length - 1,
      `\nВесь треклист не влез в ограничения телеграмма, полная версия тут \n ${WEB_URL}/albums/${album._id}`)
  }
  ctx.replyWithPhoto({ url: cover }, {
    caption:
      `
<b>Группа</b>: ${album.band.title}
<b>Альбом</b>: ${album.title}
<b>Тип</b>: ${album.type}
<b>Дата релиза</b>: ${album.releaseDate}
<b>Формат</b>: ${album.format}
<b>Лейбл</b>: ${album.label}
<b>Треклист</b>:
${normalizeTracklist(album.tracks)}
`, parse_mode: 'HTML', reply_markup: {
      resize_keyboard: true,
      inline_keyboard: inlineKeyboard,
    }
  })
}

function normalizeTracklist(tracks) {
  const tempTracks = tracks.map((track, index) => {
    const re = new RegExp('[0-9][0-9]:[0-9][0-9]')

    if (re.test(track)) {
      if (index === tracks.length - 1) {
        track = `Общее время: ${track}`
      } else {
        track = `${track}\n`
      }
    } else {
      track = `${track}\n`
    }

    return track
  }).join('')

  return tempTracks
}

function replyBandWithPhoto(ctx, band, inlineKeyboard) {
  let bandPhoto = ''
  if (band.photoUrl) {
    bandPhoto = band.photoUrl
  } else if (band.logoUrl) {
    bandPhoto = band.logoUrl
  } else if (!band.photoUrl && !band.logoUrl) {
    bandPhoto = NO_IMAGE_URL
  }
  ctx.replyWithPhoto({ url: bandPhoto }, {
    caption: getFormattedBandText(band), parse_mode: 'HTML', reply_markup: {
      resize_keyboard: true,
      extra: true,
      inline_keyboard: inlineKeyboard,
    }
  })
}

async function firstRequest(genre, country, status) {
  const { data } = await axios.get(`${API_URL}/api/search/bands/random?country=${country}&genre=${genre}&status=${status}`)
  return data.data
}

async function buildKeyboardDiscography(band) {
  const inlineKeyboard = []
  let addSiteUrlButton = false
  if (band.albums.length > 30) {
    band.albums = band.albums.slice(0, 30)
    addSiteUrlButton = true
  }
  band.albums.forEach((album) => {
    const albumYear = album.releaseDate.slice(-4)
    inlineKeyboard.push([Markup.button.callback(`[${albumYear}] ${album.title} - ${album.type}`, `getAlbum|${album._id}`)])
  })

  if (addSiteUrlButton) {
    inlineKeyboard.push([Markup.button.url('Остальные альбомы смотри на сайте', `${WEB_URL}/bands/${band._id}`)])
  }

  return inlineKeyboard
}


exports.buildKeyboardDiscography = buildKeyboardDiscography
exports.replyBandWithPhoto = replyBandWithPhoto
exports.answerWithBand = answerWithBand
exports.answerWithAlbum = answerWithAlbum
exports.queryRandomBand = queryRandomBand