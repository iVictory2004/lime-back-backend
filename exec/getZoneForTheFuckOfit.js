const axios = require('axios')
const mapData = require('../data/shortRangedata.json')
require('dotenv').config()
const { updateCookie, writeToErrorFile } = require('../exports')
const baseurl = 'https://web-production.lime.bike/api/rider/'
const map = 'v1/views/map'

async function getVehiclesAndZonesForTheFuckOfit (lat, lng, token, cookie) {
  mapData.user_latitude = lat
  mapData.user_longitude = lng
  const config = {
    method: 'get',
    baseURL: baseurl,
    url: map,
    headers: {
      'content-type': 'application/json',
      Authorization: token,
      Cookie: cookie
    },
    params: mapData
  }
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios(config)
      console.log(res.status)
      console.log(res.statusText)
      console.log('TOTU OK IN GET ZONES!')
      updateCookie(res.headers['set-cookie'][0])
      resolve()
    } catch (err) {
      console.log(err.response.status)
      console.log(err.response.statusText)
      console.log(`Ceva nu-i ok in ring Bike`)
      console.log('NU-I TOTU OK! IN GET ZONES:(((')
      writeToErrorFile(err)
      updateCookie(err.response.headers['set-cookie'][1])
      reject()
    }
  })
}

module.exports = getVehiclesAndZonesForTheFuckOfit
