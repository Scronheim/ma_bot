const cheerio = require('cheerio')
const { Markup } = require('telegraf')

const { getBand, getBandDiscography } = require('./commands/searchBand')
const { getAlbumbyId } = require('./commands/searchAlbum')
const { countryFlagsMapper, bandStatusMapper } = require('./utils/const')

exports.callbackQuery = async (ctx) => {
  const data = ctx.update.callback_query.data.split('|')
  const action = data[0]
  const firstParameter = data[1]

  switch (action) {
    case 'getBand':
      await answerWithBand(ctx, firstParameter)
      break
    case 'getAlbum':
      await answerWithAlbum(ctx, firstParameter)
      break
    default:
      break
  }

  await ctx.answerCbQuery()
}

async function answerWithAlbum(ctx, albumId) {
  const { data } = await getAlbumbyId(albumId)
  const { bandName, albumName, type, releaseDate, label, format, limit, cover, tracklist } = parseAlbumInfo(data)

  const album = {
    bandName, albumName, type, releaseDate, label, format, limit, cover, tracklist
  }

  replyAlbumWithPhoto(ctx, album)
}

async function answerWithBand(ctx, bandId) {
  const { data } = await getBand(bandId)
  const { name, genre, country, location, themes, status, label, formYear, photoUrl } = parseBandInfo(data)
  const discography = await parseDiscography(bandId)

  const inlineKeyboard = buildKeyboardDiscography(discography)

  const band = {
    name, genre, country, location, themes, status, label, formYear, photoUrl
  }

  replyBandWithPhoto(ctx, band, inlineKeyboard)
}

function replyAlbumWithPhoto(ctx, album) {
  const cover = album.cover ? album.cover : 'https://business-click.it/images/portfolio/cappelledelcommiatofirenze.png'
  ctx.replyWithPhoto({ url: cover }, {
    caption:
      `
<b>Группа</b>: ${album.bandName}
<b>Альбом</b>: ${album.albumName}
<b>Тип</b>: ${album.type}
<b>Дата релиза</b>: ${album.releaseDate}
<b>Формат</b>: ${album.format}
<b>Лейбл</b>: ${album.label}
<b>Треклист</b>:
${album.tracklist.join('')}
`, parse_mode: 'HTML'
  })
}

function replyBandWithPhoto(ctx, band, inlineKeyboard) {
  ctx.replyWithPhoto({ url: band.photoUrl }, {
    caption:
      `
<b>Группа</b>: ${band.name}
<b>Жанр</b>: ${band.genre}
<b>Страна</b>: ${countryFlagsMapper[band.country]} ${band.country} (${band.location})
<b>Темы текстов</b>: ${band.themes}
<b>Год образования</b>: ${band.formYear}
<b>Статус</b>: ${bandStatusMapper[band.status]}
<b>Лейбл</b>: ${band.label}
`
    , parse_mode: 'HTML', reply_markup: {
      resize_keyboard: true,
      inline_keyboard: inlineKeyboard,
    }
  })
}

function buildKeyboardDiscography(discography) {
  const inlineKeyboard = []
  discography.forEach(album => {
    inlineKeyboard.push(
      [Markup.button.callback(`[${album.year}] ${album.name} - ${album.type}`, `getAlbum|${album.id}`),]
    )
  })

  return inlineKeyboard
}

function parseAlbumInfo(html) {
  const $ = cheerio.load(html)
  const bandName = $('.band_name a').text()
  const albumName = $('.album_name a').text()
  const type = $('#album_info .float_left dd').eq(0).text()
  const releaseDate = $('#album_info .float_left dd').eq(1).text()
  const label = $('#album_info .float_right dd').eq(0).text()
  const format = $('#album_info .float_right dd').eq(1).text()
  const limit = $('#album_info .float_right dd').eq(2).text()
  const cover = $('#cover').attr('href')
  const tracklistHTML = $('table.table_lyrics tr').not('.displayNone')
  const tracklist = []
  for (let index = 0; index < tracklistHTML.length - 1; index++) {
    const track = tracklistHTML.eq(index)
    tracklist.push(`${track.children().eq(0).text().trim()} ${track.children().eq(1).text().trim()} (${track.children().eq(2).text().trim()})\n`)
  }

  return { bandName, albumName, type, releaseDate, label, format, limit, cover, tracklist }
}

function parseBandInfo(html) {
  const $ = cheerio.load(html)
  const id = $('input[name=origin]').attr('value').split('/')[4]
  const name = $('.band_name a').text()
  const genre = $('#band_stats .float_right dt').nextAll().eq(0).text()
  const country = $('#band_stats .float_left dt').nextAll().eq(0).text()
  const location = $('#band_stats .float_left dt').nextAll().eq(2).text()
  const themes = $('#band_stats .float_right dt').nextAll().eq(2).text()
  const status = $('#band_stats .float_left dt').nextAll().eq(4).text()
  const label = $('#band_stats .float_right dt').nextAll().eq(4).text()
  const formYear = $('#band_stats .float_left dt').nextAll().eq(6).text()
  const yearsActive = $('#band_stats .float_right').nextAll().eq(0).children()
    .eq(1)
    .text()
    .replace(/\s/g, '')
  const photoUrl = $('#photo').attr('href')
  const logoUrl = $('#logo').attr('href')

  return { id, name, genre, country, location, themes, status, label, formYear, yearsActive, photoUrl, logoUrl }
}

async function parseDiscography(bandId) {
  const discographyHTML = await getBandDiscography(bandId)
  const $d = cheerio.load(discographyHTML.data)
  const albums = $d('.display, .discog td').children().eq(1).children()
  const discography = []
  for (let index = 0; index < albums.length; index++) {
    const album = albums.eq(index)
    const albumId = album.children().eq(0).children().eq(0).attr('href').split('/').pop()
    const albumName = album.children().eq(0).text()
    const albumType = album.children().eq(1).text()
    const albumYear = album.children().eq(2).text()
    if (albumName) discography.push({
      id: albumId,
      name: albumName,
      type: albumType,
      year: albumYear,
    })
  }

  return discography
}

exports.parseBandInfo = parseBandInfo
exports.parseDiscography = parseDiscography
exports.buildKeyboardDiscography = buildKeyboardDiscography
exports.replyBandWithPhoto = replyBandWithPhoto