const bikes = require('../data/bikeids.json')
const ringBike = require('./ringBike')
const last15 = require('../data/last15bikesbackwards.json')
const readline = require('readline')
const { writeToErrorFile } = require('../exports')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function ringBikesSync (bikesArray, n) {
  const firstNBikes = bikesArray.slice(0, n)
  try {
    for (let bike of firstNBikes) {
      const lat = bike.attributes.latitude
      const lng = bike.attributes.longitude
      ringBike(bike.id, lat, lng).then(res => {
        console.log(res.data)
        console.log(res.status)
        console.log(res.statusText)
        console.log(`Am sunat ${bike.attributes.plate_number} aka`)
        console.log(bike.id)
      })
    }
  } catch (e) {
    console.log(`Nu mere sa sune trotii`)
    console.log(e)
    writeToErrorFile(e)
  }
  rl.close()
}

async function doThething () {
  rl.question(`Cate troti vrei sa suni boossu?\n`, async nr => {
    ringBikesSync(bikes, nr)
  })
}

doThething()
