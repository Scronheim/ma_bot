const axios = require('axios')

const axiosOptions = {
  timeout: 3000,
  headers: {
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 YaBrowser/24.1.0.0 Safari/537.36'
  }
}

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