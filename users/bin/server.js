// @ts-check
"use strict";

/**
 * @namespace __MainServe__
 * @description
 * <strong>ID:</strong> </br>
 * Saat node pertama kali dijalankan, file ini dieksekusi pertama kali.
 * File ini menjadi pintu masuk sebelum menuju routing, controller, dan lain-lain.
 * di dalam file ini semua dependency yang berkaitan dengan
 * server (seperti express dan dotenv) di import,
 * dan akan di jalankan pertama kali saat inisiasi server.</br></br>
 *
 * <strong>EN:</strong> </br>
 * When node starting, this file will execute first. This file is the starting point
 * before routing, contoller, etc. All dependencies that should run first must be install
 * in this file (express, dotenv, etc).
 */

// importing express
const express = require("express");

// set up enverionment variables
const path = require("path");
const envName = !process.env.ENV_NAME ? "PROD" : `${process.env.ENV_NAME}`;
const dotenv = require("dotenv");
dotenv.config({ path: path.resolve(__dirname, `../env/${envName}.env`) });

// impert middlewares
const config = require("./app/config/");
const loaderApp = require("./app/");
const app = express();

// load the app
loaderApp(app);

// start the server
app.listen(+config.app.PORT, "0.0.0.0", () => {
	console.clear();
	// Run server
	if (process.env.APP_HOST !== "TEST") {
		console.log(
			`[INFO] [${new Date().toLocaleString()}] [${config.app.HOST} on port ${
				config.app.PORT
			} is Running]`
		);
	}
});

module.exports = app;
