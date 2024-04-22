const axios = require('axios')
const { axiosOptions, TIMEOUT_ERROR, API_URL } = require('../utils/const')

async function searchBandAlbum(bandName, albumName, retries = 3) {
  try {
    return await axios.get(`${API_URL}/search/albums?bandName=${bandName}&albumName=${albumName}`, axiosOptions)
  } catch (e) {
    if (retries > 0) {
      console.log(`Retrying... attempts left: ${retries - 1}`)
      await new Promise(resolve => setTimeout(resolve, 1000)) // Wait for 1 second before retrying
      return searchBandAlbum(bandName, albumName, retries - 1)
    } else {
      throw new Error(TIMEOUT_ERROR)
    }
  }
}

exports.searchBandAlbum = searchBandAlbum