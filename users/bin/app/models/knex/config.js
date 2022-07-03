// @ts-check
"use strict";

const { knex } = require("knex");
const config = require("../../config");

module.exports = knex({
	client: "mysql2",
	connection: {
		host: config.db.HOST,
		database: config.db.DATABASE,
		port: +config.db.PORT,
		user: config.db.USER,
		password: config.db.PASSWORD,
		multipleStatements: true,
	},
});
