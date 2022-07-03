// @ts-check
"use strict";

// eslint-disable-next-line no-unused-vars
const { Application } = require("express");

const cors = require("cors");
const bodyParser = require("body-parser");
const errorHandler = require("./errors/");
const routes = require("./routes");

// const Logger = require("./utils/logger");
// const logger = new Logger();

/**
 * @memberof __MainServe__
 * @inner
 * @description
 * <strong>ID:</strong></br>
 * Di dalam file ini semua middleware di pasang, sepeti routing, cors, logger, dan lainnya.
 * Ketika kamu ingin menginstal middleware kamu bisa memasang di file ini. </br></br>
 *
 * <strong>EN:</strong></br>
 * Middlewares installed here, you can install every middleware in this file.
 *
 * @param {Application} app IN: Aplikasi bawaan express</br>
 * 							EN: Application default from express
 * @returns {void}
 */
const loaderApp = (app) => {
	//  set up middleware which will run before every request
	app.use(cors());
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));

	// Routing
	Object.keys(routes).forEach((key) => app.use("/", routes[key]));

	// Error Handling
	app.use(errorHandler);
	// Unhandling Rejection Expection
	process.on(
		"unhandledRejection",
		/**
		 * ID: semua error yang tidak di tangkap ErrorHandler akan mengarah kesini </br>
		 * EN: all unhandle using ErrorHandler error will go here
		 * @param {string} reason
		 * @param {Promise<any>} p
		 */
		(reason, p) => {
			console.log(p);
			throw reason;
		}
	);
	process.on(
		"uncaughtException",
		/**
		 * ID: semua error yang fatal akan menuju kesini, dan server akan menutup paksa </br>
		 * EN: all fatal error might go here, and the server will force close
		 * @param {Error} error
		 */
		(error) => {
			console.log(error);
			process.exit(1);
		}
	);
	/**
	 * ID: menutup server saay diberi sinyal SIGINT atau SIGTERM </br>
	 * EN: closing app gracefully when process on SIGINT or SIGTERM
	 */
	const gracefulShutdownHandler = () => {
		process.exit();
	};
	process.on("SIGINT", gracefulShutdownHandler);
	process.on("SIGTERM", gracefulShutdownHandler);
};

module.exports = loaderApp;
