const axios = require('axios')
const { Markup } = require('telegraf')
const { axiosOptions, TIMEOUT_ERROR, API_URL } = require('../utils/const')

exports.searchBand = async (ctx) => {
  const bandName = ctx.update.message.text

  const { data } = await searchByBandName(bandName)
  const bands = data.data

  const inlineKeyboard = []
  bands.forEach((band) => {
    inlineKeyboard.push(
      [Markup.button.callback(`${band.title} (${band.genre}) - ${band.country}`, `getBand|${band._id}`)]
    )
  })
  if (bands.length) {
    ctx.reply('Вот что удалось найти', {
      reply_markup: {
        resize_keyboard: true,
        inline_keyboard: inlineKeyboard
      }
    })
  } else {
    ctx.reply('По данному запросу ничего не нашлось')
  }
}

exports.getBandLinks = async (bandId, retries = 3) => {
  try {
    return await axios.get(`https://www.metal-archives.com/link/ajax-list/type/band/id/${bandId}`, axiosOptions)
  } catch (e) {
    if (retries > 0) {
      console.log(`Retrying... attempts left: ${retries - 1}`)
      await new Promise(resolve => setTimeout(resolve, 1000)) // Wait for 1 second before retrying
      return getBandLinks(bandId, retries - 1)
    } else {
      throw new Error(TIMEOUT_ERROR)
    }
  }
}


exports.getRandomBand = async (retries = 3) => {
  try {
    return await axios.get('https://www.metal-archives.com/band/random', axiosOptions)
  } catch (e) {
    if (retries > 0) {
      console.log(`Retrying... attempts left: ${retries - 1}`)
      await new Promise(resolve => setTimeout(resolve, 1000)) // Wait for 1 second before retrying
      return this.getRandomBand(retries - 1)
    } else {
      throw new Error(TIMEOUT_ERROR)
    }
  }
}

exports.getBand = async (bandId, retries = 3) => {
  try {
    return await axios.get(`${API_URL}/api/bands?id=${bandId}`, axiosOptions)
  } catch (e) {
    if (retries > 0) {
      console.log(`Retrying... attempts left: ${retries - 1}`)
      await new Promise(resolve => setTimeout(resolve, 1000)) // Wait for 1 second before retrying
      return this.getBand(bandId, retries - 1)
    } else {
      throw new Error(TIMEOUT_ERROR)
    }
  }
}

async function searchByBandName(bandName, retries = 3) {
  try {
    return await axios.get(`${API_URL}/api/search/bands?q=${bandName}`, axiosOptions)
  } catch (e) {
    if (retries > 0) {
      console.log(`Retrying... attempts left: ${retries - 1}`)
      await new Promise(resolve => setTimeout(resolve, 1000)) // Wait for 1 second before retrying
      return searchByBandName(bandName, retries - 1)
    } else {
      throw new Error(TIMEOUT_ERROR)
    }
  }
}

exports.getBandDiscography = async (bandId, retries = 3) => {
  try {
    return await axios.get(`https://www.metal-archives.com/band/discography/id/${bandId}/tab/all`, axiosOptions)
  } catch (e) {
    if (retries > 0) {
      console.log(`Retrying... attempts left: ${retries - 1}`)
      await new Promise(resolve => setTimeout(resolve, 1000)) // Wait for 1 second before retrying
      return this.getBandDiscography(bandId, retries - 1)
    } else {
      throw new Error(TIMEOUT_ERROR)
    }
  }
}