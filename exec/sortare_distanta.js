const fs = require( 'fs' )
const {
  error
} = require( 'console' )

function transformCoords( n ) {
  let nr = n
  nr *= 100000000
  nr = Math.floor( nr % 100000000 )
  return nr
}

function sortare( bikes, userlat, userlng ) {
  return new Promise( resolve => {
    userlat *= 100000000
    userlat = Math.floor( userlat % 100000000 )
    userlng *= 100000000
    userlng = Math.floor( userlng % 100000000 )

    for ( let bike of bikes ) {
      const lat = transformCoords( bike.attributes.latitude )
      const lng = transformCoords( bike.attributes.longitude )
      const catetax = Math.abs( userlng - lng )
      const catetay = Math.abs( userlat - lat )
      const ipotenuza = Math.sqrt( catetax + catetay ) % 10000
      bike.distance = ipotenuza
    }

    bikes.sort( ( a, b ) => a.distance - b.distance )

    // fs.writeFile('./data/bikeids.json', JSON.stringify(bikes), err => {
    //   if (err) throw error
    // })

    for ( let bike of bikes ) {
      console.log( bike.attributes.plate_number )
      console.log( bike.distance )
    }
    resolve()
  } )
}

module.exports = sortare