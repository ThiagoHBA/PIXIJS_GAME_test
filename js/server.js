"use strict";

const express = require( "express" );
const cors = require( "cors" );
const routes = require( "./routes" );
const AppError = require( "./errors/AppError" );

const app = async config => {

	const server = express();
	server.config = config;

	server.use( express.json() );
	server.use( cors() );
	server.use( routes );

	server.use(
		( err, request, response, next ) => {
			if ( err instanceof AppError ) {
				return response.status( err.statusCode ).json( {
					status: "error",
					message: err.message
				} );
			}

			console.error( err );

			return response.status( 500 ).json( {
				status: "error",
				message: "Erro interno do Servidor."
			} );
		}
	);

	return server;
};

module.exports = app;
