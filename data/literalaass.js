const fs = require( 'fs' )


fs.writeFile( './bikeids.json', 'pula', err => {
    if ( err ) console.log( err )
} )