const keys = require('../../config');
const fetch = require('node-fetch');
const defaults = require('./defaults');

async function youtubeAPI(query, num='5') {
  const vidArr = [];
  const catArr = defaults.categories;
  for (let i = 0; i < catArr.length; i++) {
    let response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${num}&q=${catArr[i]}&key=${keys.apiKey}`)
    let res = await response.json()
    vidArr.push(res)
  }
  console.log(vidArr)
  
  
}

module.exports = {
  youtubeAPI: youtubeAPI
}