const axios = require('axios')
const { axiosOptions } = require('../utils/const')

async function getAlbumbyId(albumId, retries = 3) {
  try {
    return await axios.get(`https://www.metal-archives.com/albums/xxx/xxx/${albumId}`, axiosOptions)
  } catch (e) {
    if (retries > 0) {
      console.log(`Retrying... attempts left: ${retries - 1}`);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second before retrying
      return getAlbumbyId(albumId, retries - 1);
    } else {
      throw new Error('Max retries reached. ' + e.message);
    }
  }
}

exports.getAlbumbyId = getAlbumbyId