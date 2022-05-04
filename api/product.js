const express = require( 'express' )
const router = express.Router()

router.get( '/', ( req, res ) => {
    res.json( {
        lol: 'cf coaie'
    } )
} )

module.exports = router