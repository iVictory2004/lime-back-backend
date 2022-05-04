const express = require( 'express' )
const app = express()
const product = require( './api/product' )
const PORT = process.env.PORT || 3000

app.use( '/api/product', product )

app.listen( PORT, () => {
    console.log( `E PORTNIT PORT ${PORT}` )
} )