// @ts-check
"use strict";

const connection = require("../config");
const table = require("../table.properties/users");

/**
 * Get record(s) of users table
 * @param {string} [usernameOrEmail]
 * @returns {Promise<any>}
 */
module.exports.getUserData = async (usernameOrEmail) => {
	return await connection(table.PROPERTIES.TABLE_NAME).modify(
		(currentQuery) => {
			if (usernameOrEmail) {
				currentQuery
					.where(table.PROPERTIES.COLOUMNS.email, usernameOrEmail)
					.orWhere(table.PROPERTIES.COLOUMNS.username, usernameOrEmail)
					.first();
			}
		}
	);
};

/**
 * get a data by users ID
 * @param {number} id
 * @returns {Promise<any>}
 */
module.exports.getDataById = async (id) => {
	return await connection(table.PROPERTIES.TABLE_NAME)
		.where(table.PROPERTIES.COLOUMNS.ID, id)
		.first();
};

