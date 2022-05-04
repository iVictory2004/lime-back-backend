const express = require( 'express' )
const {
    getClosestBikes
} = require( '../exec/getZonesAndBikes' )
const router = express.Router()

router.get( '/', async ( req, res ) => {
    console.log( `Uite coordonatele la un prost sa-i dai ddos:` )
    console.log( req.query )
    try {
        const bikes = await getClosestBikes( req.query.lat, req.query.lng )
        console.log( bikes )
        res.json( bikes )
    } catch ( e ) {
        console.log( e )
    }
} )

module.exports = router