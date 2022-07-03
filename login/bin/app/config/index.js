// @ts-check
"use strict";

// FIXME : refactore it

/**
 * <strong>IN:</strong></br>
 * semua enverionment variables di deklarasikan di object ini,
 * digunakan untuk berbagai macam konfigurasi nantinya.
 * jika nanti tidak menggunakan enverionment variable, nilai-nilai
 * di dalam object ini bisa di ganti sesuai kebutuham. </br>
 * </br>
 * <strong>EN:</strong></br>
 * all enverionment variables declare in this object, for any configuration
 * or dependencies in your contoller, service, etc.
 * you can change the value if enverionment variables is not use
 * @constant {object} config
 * @memberof __MainServe__
 * @inner
 */
const config = {
	app: {
		HOST: process.env.APP_HOST || "127.0.0.1",
		PORT: process.env.APP_PORT || 3000,
	},
	db: {
		HOST: process.env.DB_HOST || "127.0.0.1",
		DATABASE: process.env.DB_NAME || "testdb",
		PORT: process.env.DB_PORT || 3306,
		USER: process.env.DB_USER || "root",
		PASSWORD: process.env.DB_PASS || "",
	},
	bcrypt: {
		ROUND: process.env.BCR_ROUND || 12,
	},
	redis: {
		HOST: process.env.REDIS_HOST,
		PORT: process.env.REDIS_PORT,
	},
};

module.exports = config;
