const express = require( 'express' )
const app = express()
// const bikes = require( './api/getBikes' )
const PORT = process.env.PORT || 3000
const {
    getClosestBikes
} = require( './exec/getZonesAndBikes' )


app.use( '/', async ( req, res ) => {
    console.log( `Uite coordonatele la un prost sa-i dai ddos:` )
    console.log( req.query )
    if ( req.query.lat && req.query.lng )
        try {
            const bikes = await getClosestBikes( req.query.lat, req.query.lng )
            console.log( bikes )
            res.json( bikes )
        } catch ( e ) {
            console.log( e )
        }
    else
        res.send( `N-ai trimis parametrii bine bruh` )
} )

app.listen( PORT, () => {
    console.log( `E PORTNIT PORT ${PORT}` )
} )