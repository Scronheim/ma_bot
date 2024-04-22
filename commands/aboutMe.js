const axios = require('axios')
const { API_URL, axiosOptions, TIMEOUT_ERROR } = require('../utils/const')

exports.aboutMe = async (ctx) => {
  const bands = await getBandsNumber()
  const bandsNumber = bands.data.data
  const albums = await getAlbumsNumber()
  const albumsNumber = albums.data.data
  return ctx.reply(`
Групп: ${bandsNumber} | Альбомов: ${albumsNumber}
Все данные предоставлены сервисом metal-library.com
Админ: @scronheim
`)
}

async function getBandsNumber(retries = 3) {
  try {
    return await axios.get(`${API_URL}/search/bands/count`, axiosOptions)
  } catch (e) {
    console.log(e)
    if (retries > 0) {
      console.log(`Retrying... attempts left: ${retries - 1}`)
      await new Promise(resolve => setTimeout(resolve, 1000)) // Wait for 1 second before retrying
      return getBandsNumber(retries - 1)
    } else {
      throw new Error(TIMEOUT_ERROR)
    }
  }
}

async function getAlbumsNumber(retries = 3) {
  try {
    return await axios.get(`${API_URL}/search/albums/count`, axiosOptions)
  } catch (e) {
    console.log(e)
    if (retries > 0) {
      console.log(`Retrying... attempts left: ${retries - 1}`)
      await new Promise(resolve => setTimeout(resolve, 1000)) // Wait for 1 second before retrying
      return getAlbumsNumber(retries - 1)
    } else {
      throw new Error(TIMEOUT_ERROR)
    }
  }
}