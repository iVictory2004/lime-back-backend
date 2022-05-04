const express = require( 'express' )
const router = express.Router()
const {
    getClosestBikes
} = require( '../exec/getZonesAndBikes' )

const allowCors = fn => async ( req, res ) => {
    res.setHeader( 'Access-Control-Allow-Credentials', true )
    res.setHeader( 'Access-Control-Allow-Origin', '*' )
    // another common pattern
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader( 'Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT' )
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    if ( req.method === 'OPTIONS' ) {
        res.status( 200 ).end()
        return
    }
    return await fn( req, res )
}

const handler = async ( req, res ) => {
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
}

module.exports = allowCors( handler )