// @ts-check
"use strict";

/**
 * @namespace MysqlConfiguration
 * @description
 * ID: </br>
 * Ini adalah pengaturan awal untuk mengkoneksikan server ke MySql database.
 * Semua pengaturan tentang host, username, password, nama database, dan lain-lain ada
 * di file ini. </br></br>
 *
 * EN:
 * This is default configure file for MySql connection.
 * you can config host, username, password, database name, etc in this file.
 */

const mysql = require("mysql2/promise");
// eslint-disable-next-line no-unused-vars
const { RowDataPacket, OkPacket, ResultSetHeader } = require("mysql2");

/**
 * ID: Ini adalah method untuk melakukan query ke MySql, semua query sudah di sanitize sebelum dieksekusi. </br>
 * EN: This method doing query execution to MySql, all query has been sanitized before execution.
 * @param {*} queries
 * @returns {Promise<RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader>}
 */
module.exports.execQuery = async (queries) => {
	const connection = mysql.createPool({
		// port: process.env.DB_PORT,
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASS,
		database: process.env.DB_NAME,
		multipleStatements: true,
	});
	const [rows] = await connection.query(queries);
	return rows;
};
