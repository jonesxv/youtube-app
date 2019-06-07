const keys = require('../../config');
const fetch = require('node-fetch');

function youtubeAPI(query) {
  fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${query}&key=${keys.apiKey}`)
  .then(res => {
    return res.json()
  }).then(data => {
    console.log(data)
  })
}

module.exports = {
  youtubeAPI: youtubeAPI
}