const axios = require('axios')
const qs = require('qs')
const { TOKEN, COOKIE } = require('../env.json')
const getVehiclesAndZonesForTheFuckOfit = require('./getZoneForTheFuckOfit')
const { updateCookie } = require('../exports')

async function ringBike (et_id, lat, lng) {
  await getVehiclesAndZonesForTheFuckOfit(lat, lng, TOKEN, COOKIE)
  et_id = qs.stringify({
    id: et_id
  })
  const config = {
    method: 'post',
    url: 'https://web-production.lime.bike/api/rider/v1/actions/ring_bike',
    headers: {
      Authorization: TOKEN,
      'Content-Type': 'application/x-www-form-urlencoded',
      Cookie: COOKIE
    },
    data: et_id
  }
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios(config)
      updateCookie(res.headers['set-cookie'][0])
      resolve(res)
    } catch (err) {
      updateCookie(err.response.headers['set-cookie'][0])
      reject(err)
    }
  })
}

module.exports = ringBike
