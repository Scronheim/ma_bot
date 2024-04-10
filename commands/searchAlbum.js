const axios = require('axios')
const { axiosOptions, TIMEOUT_ERROR } = require('../utils/const')

async function searchBandAlbum(bandName, albumName, retries = 3) {
  try {
    return await axios.get(`https://www.metal-archives.com/search/ajax-advanced/searching/albums/?bandName=${bandName}&releaseTitle=${albumName}&releaseYearFrom=&releaseMonthFrom=&releaseYearTo=&releaseMonthTo=&country=&location=&releaseLabelName=&releaseCatalogNumber=&releaseIdentifiers=&releaseRecordingInfo=&releaseDescription=&releaseNotes=&genre=&sEcho=1&iColumns=3&sColumns=&iDisplayStart=0&iDisplayLength=1`, axiosOptions)
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



async function getAlbumbyId(albumId, retries = 3) {
  try {
    return await axios.get(`https://www.metal-archives.com/albums/xxx/xxx/${albumId}`, axiosOptions)
  } catch (e) {
    if (retries > 0) {
      console.log(`Retrying... attempts left: ${retries - 1}`)
      await new Promise(resolve => setTimeout(resolve, 1000)) // Wait for 1 second before retrying
      return getAlbumbyId(albumId, retries - 1)
    } else {
      throw new Error(TIMEOUT_ERROR)
    }
  }
}

exports.getAlbumbyId = getAlbumbyId
exports.searchBandAlbum = searchBandAlbum