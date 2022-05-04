const {
  error
} = require( 'console' )
const {
  get
} = require( 'express/lib/response' )
const fs = require( 'fs' )

async function updateCookie( cookie ) {
  const data = require( './env.json' )
  data.COOKIE = cookie
  fs.writeFile( './env.json', JSON.stringify( data ), err => {
    if ( err ) console.log( err )
  } )
}

function writeToErrorFile( errorda ) {
  fs.writeFile(
    './data/errors.txt',
    JSON.stringify( errorda.response.data ),
    err => {
      if ( err ) throw error
    }
  )
}
async function writeToRespFile( res ) {
  return new Promise( async ( resolve, reject ) => {
    try {
      fs.writeFileSync( './data/resp.json', JSON.stringify( res ) )
      resolve()
    } catch ( err ) {
      reject()
    }
  } )
}

function getBikes( res ) {
  const bikes = res.data.attributes.bikes
  return new Promise( ( resolve, reject ) => {
    fs.writeFile( './data/bikeids.json', JSON.stringify( bikes ), err => {
      if ( err ) reject( err )
      else resolve()
    } )
  } )
}
async function getlast15BikesBackwards() {
  const bikes = require( './data/bikeids.json' )
  let last15 = []
  for ( let i = 14; i >= 0; i-- ) {
    last15.push( bikes[ i ] )
  }
  fs.writeFile(
    './data/last15bikesbackwards.json',
    JSON.stringify( last15 ),
    err => {
      if ( err ) throw error
    }
  )

  console.log( last15 )
}

const sleep = delay => {
  return new Promise( resolve => {
    setTimeout( resolve, delay )
  } )
}

module.exports = {
  updateCookie,
  writeToErrorFile,
  writeToRespFile,
  getBikes,
  getlast15BikesBackwards,
  sleep
}