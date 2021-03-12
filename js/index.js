"use strict";

const config = require( "./config/config" );
const server = require( "./server" );

const startServer = async () => {
	try {

		const app = await server( config );
		await app.listen( config.port_app, () => {
			console.log( `Server running at http://localhost:${ config.port_app }` );
		} );

	}
	catch( err ) {
		console.log( "Startup error", err );
	}
};

startServer();
