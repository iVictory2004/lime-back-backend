const express = require( 'express' )
const app = express()
const bikes = require( './api/getBikes' )
const PORT = process.env.PORT || 3000

app.use( '/', bikes )


app.listen( PORT, () => {
    console.log( `E PORTNIT PORT  coi ${PORT}` )
} )