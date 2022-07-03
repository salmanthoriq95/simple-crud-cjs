// @ts-check
"use strict";

const { knex } = require("knex");
const config = require("../../config");

module.exports = knex({
	client: "mysql2",
	connection: {
		host: config.mySqlDb.HOST,
		database: config.mySqlDb.DATABASE,
		port: +config.mySqlDb.PORT,
		user: config.mySqlDb.USER,
		password: config.mySqlDb.PASSWORD,
		multipleStatements: true,
	},
});
