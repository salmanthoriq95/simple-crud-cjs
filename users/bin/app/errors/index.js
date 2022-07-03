// @ts-check
"use strict";

/**
 * @namespace ErrorHandler
 * @description
 *
 * <strong>IN:</strong></br>
 * Semua kostumisasi error akan berakhir di sini,
 * Anda bisa melakukan semua yang berhubungan dengan kostumisasi error
 * di dalam folder ini.</br>
 * </br>
 * <strong>EN:</strong></br>
 * In this directory is for error handling, all your costumize error
 * will go under here. you can modify as you need
 */

// eslint-disable-next-line no-unused-vars
const { Request, Response, NextFunction } = require("express");

/**
 * ID: body utama untuk kostumisasi error handler </br></br>
 * EN: Main Body for customize error handler
 *
 * @typedef IErrorResponse
 * @type {object}
 * @property {string} name  	ID: Tipe error </br>
 * 								EN: error type
 * @property {string} message 	ID: respon pesan untuk console atau user </br>
 * 								EN: message you want pass to user or console
 * @property {string} [stack] 	ERROR STACK
 * @property {boolean} [success] success status
 * @property {string} [data] 	ID: data yang ingin disampaikan kepada user atau console </br>
 * 								EN: data you want pass to user or console
 */

/**
 * ID: Fungsi handle error utama, masukkan query debug=1 saat request
 * untuk menampilkan stack sebagai response</br></br>
 *
 * EN: Default Error handler funtion, pass query debug=1 when request to make error stack as response
 *
 * @memberof ErrorHandler
 * @inner
 *
 * @function ErrorHandle
 * @param {*} error 			IN: Error yang digenerate oleh node </br>
 * 								EN:error passed from node
 * @param {Request} req 		IN: HTTP Request yang digenerate express</br>
 * 								EN: HTTP Request generated by express.
 * @param {Response} res 		IN: HTTP Response yang digenerate express</br>
 * 								EN: HTTP Response generated by express
 * @param {NextFunction} next 	IN: HTTP Response yang digenerate express</br>
 * 								EN: HTTP Response generated by express
 * @returns {Response} 			IN: HTTP Response yang digenerate express</br>
 * 								EN: HTTP Response generated by express
 */
// eslint-disable-next-line no-unused-vars
const ErrorHandle = (error, req, res, next) => {
	/**
	 * @type {IErrorResponse}
	 */
	const errorResponse = {
		success: false,
		name: error.name,
		message: error.message,
		data: error.data,
	};

	// logger.errorLog(req.url, req.method, req.headers["user-agent"], req.ip, errorResponse);

	if (req.query.debug === "1") errorResponse.stack = error.stack;
	// if (req.query.trace === "1") logger.fatalLog(error);
	if (error.name === "HttpExpection") {
		return res.status(+error.statusCode).json(errorResponse);
	}

	return res.status(500).json(
		req.query.debug === "1"
			? errorResponse
			: {
					name: "Internal Server Error",
					message: "Please contact administrator",
			  }
	);
};

module.exports = ErrorHandle;
