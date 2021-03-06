// const axios = require( 'axios' )
const fetch = ( ...args ) =>
  import( 'node-fetch' ).then( ( {
    default: fetch
  } ) => fetch( ...args ) );

// const fetch = require( 'node-fetch' )
const mapData = require( '../data/data.json' )
const https = require( 'https' );
const fs = require( 'fs' )
const readline = require( 'readline' )
const rl = readline.createInterface( {
  input: process.stdin,
  output: process.stdout
} )
const sortare = require( './sortare_distanta.js' )
const {
  TOKEN,
  COOKIE
} = require( '../env.json' )
const {
  updateCookie,
  writeToErrorFile,
  writeToRespFile
} = require( '../exports' )
const {
  contentDisposition
} = require( 'express/lib/utils' )
const {
  response
} = require( 'express' );
const {
  on
} = require( 'events' );
const {
  resolve
} = require( 'path' );

const baseurl = 'https://web-production.lime.bike/api/rider'
const map = '/v1/views/map'

async function getVehiclesAndZones( data, token, cookie ) {
  let bikesArray = []
  console.log( `the data is` )
  console.log( data )
  let string = `?`
  for ( let [ key, value ] of Object.entries( data ) ) {
    string += `${key}=${value}&`
  }
  string = string.slice( 0, -1 )
  console.log( string )
  try {
    const response = await fetch( baseurl + map + string, {
      method: 'get',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'content-type': 'application/json',
        Authorization: token,
        Cookie: cookie
      },
    } );
    const res = await response.text();
    console.log( 'Am datele in get zones' )
    try {
      // writeToRespFile(res.data)
      // updateCookie( res.headers[ 'set-cookie' ][ 1 ] )
      // const bikes = res.data.attributes.bikes
      console.log( `THIS IS THE VARIABLE D U FUCK` )
      console.log( res )
      // console.log( bikes )
      // sortare( bikes, data.user_latitude, data.user_longitude )
      // bikesArray = bikes
      return new Promise( ( resolve ) => {
        resolve( bikes )
      } )
    } catch ( e ) {
      console.log( `eroare in get zones la sortare sau scriere in fiesiere`, e )
    }
    // console.log( res.data.data.attributes.bikes )
    // console.log( {
    //   ...res,
    //   data: 'gol lol'
    // } )
  } catch ( err ) {
    console.log( `Ceva nu-i ok in get zones` )
    console.log( err )
    // writeToErrorFile(err)
    updateCookie( err.response.headers[ 'set-cookie' ][ 0 ] )
  }
}

function ask() {
  rl.question( `Ce coordonate boss?`, coords => {
    coords = coords.split( `,` )
    console.log( coords )
    mapData.user_latitude = parseFloat( coords[ 0 ] )
    mapData.user_longitude = parseFloat( coords[ 1 ] )
    getCorners()
    getVehiclesAndZones( mapData, TOKEN, COOKIE )
    // logShit()
  } )
}
//fa patrat in jurul userului
function getCorners() {
  mapData.ne_lat = mapData.user_latitude + 0.003
  mapData.ne_lng = mapData.user_longitude + 0.003
  mapData.sw_lat = mapData.user_latitude - 0.003
  mapData.sw_lng = mapData.user_longitude - 0.003
}

function logShit() {
  fs.writeFile( './data/data.json', JSON.stringify( mapData ), err => {
    if ( err ) console.log( err )
  } )

  //tine minte patratul in care sa se uite ulterior cu zoom-ul 1

  fs.writeFile(
    './data/shortRangedata.json',
    JSON.stringify( {
      ...mapData,
      zoom: 1
    } ),
    err => {
      if ( err ) console.log( err )
    }
  )
}

async function getClosestBikes( lat, lng ) {
  mapData.user_latitude = lat
  mapData.user_longitude = lng
  getCorners()
  // logShit()
  return new Promise( async ( resolve, reject ) => {
    try {
      const bikes = await getVehiclesAndZones( mapData, TOKEN, COOKIE )
      resolve( bikes )
    } catch ( e ) {
      reject( e )
    }
  } )
}

//decomenteaza ca sa scrii coordonatele in consola

module.exports = {
  getClosestBikes
}