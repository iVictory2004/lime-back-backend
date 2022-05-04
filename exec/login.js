const axios = require( "axios" );
const fs = require( "fs" );
const {
	error
} = require( "console" );
const readline = require( "readline" );
const mapData = require( "../data/data.json" );
const rl = readline.createInterface( {
	input: process.stdin,
	output: process.stdout,
} );

axios.defaults.withCredentials = true;

const baseurl = "https://web-production.lime.bike/api/rider/";
const login = "v1/login";
const phone = "?phone=%2B40770661491";
const map = "/v1/views/map";

function writeToEnv( thing ) {
	fs.appendFile( "../env.json", `${thing}\n`, ( err ) => {
		if ( err ) throw error;
	} );
}

function writeToDataResp( thing ) {
	fs.writeFile( "../data/resp.json", `${thing.data}`, ( err ) => {
		if ( err ) throw error;
	} );
}

async function getVehiclesAndZones( token, cookie ) {
	return await axios( {
			method: "get",
			baseURL: baseurl,
			url: map,
			headers: {
				"content-type": "application/json",
				Authorization: token,
				Session: cookie,
			},
			params: mapData,
		} )
		.then( ( res ) => {
			console.log( res.data );
			const closestBikeEtID = res.data.attributes.bikes[ 0 ].id;
			//pune daor id-u de la cea mai apropiata troti
			if ( !closestBikeEtID ) console.log( `Nu ai nimic in zona lol` );
			else {
				fs.appendFile(
					"..data/bikeid.json",
					`{"id" : "${closestBikeEtID}"}`,
					( err ) => {
						if ( err ) throw error;
					}
				);
			}
		} )
		.catch( ( err ) => {
			console.log( err );
		} );
}

async function primesteCod() {
	console.log( "nu uita, PULA! *thumbs upp*" );
	await axios( {
			method: "get",
			baseURL: baseurl,
			url: login + phone,
		} )
		.then( ( res ) => {
			console.log( res.data );
			rl.question( "Codeu de e telefon coaie?", ( cod ) => {
				sendPhoneCode( cod );
				rl.close();
			} );
		} )
		.catch( ( err ) => {
			console.log( err );
		} );
}

const sendPhoneCode = async ( inputCode ) => {
	await axios( {
		method: "post",
		url: baseurl + login,
		headers: {
			"content-type": "application/json"
		},
		data: {
			login_code: inputCode,
			phone: "+40770661491"
		},
	} ).then( ( res ) => {
		console.log( res );

		// scoate numele cookiuriilui si protocoalele => ramane doar stringul in sine
		const websessionCookie = res.headers[ "set-cookie" ][ 1 ]

		writeToEnv( `TOKEN = ${res.data.token},` );
		writeToEnv( `COOKIE = ${websessionCookie}` );
		//pune in fisier taote datele de rasp
		writeToDataResp(
			getVehiclesAndZones( `Bearer ${res.data.token}`, websessionCookie )
		);
	} );
};

primesteCod();