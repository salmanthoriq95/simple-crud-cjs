// @ts-check
"use strict";

const connection = require("../config");
const table = require("../table.properties/users");

/**
 * get all data or single data of users
 * @param {number} [id]
 * @returns {Promise<any>}
 */
module.exports.getData = async (id) => {
	return await connection(table.PROPERTIES.TABLE_NAME).modify(
		(currentQuery) => {
			if (id) currentQuery.where(table.PROPERTIES.COLOUMNS.ID, id).first();
		}
	);
};

/**
 * Add new data to user table
 * @param {object} payload
 * @param {string} payload.username
 * @param {boolean} payload.isAdmin
 * @param {string} payload.email
 * @param {string} payload.password
 * @returns {Promise<any>}
 */
module.exports.postData = async (payload) => {
	return await connection(table.PROPERTIES.TABLE_NAME).insert(payload);
};

/**
 * Update user data query
 * @param {object} payload
 * @param {string} payload.username
 * @param {boolean} payload.isAdmin
 * @param {string} payload.email
 * @param {string} payload.password
 * @param {number} [payload.id]
 * @returns {Promise<any>}
 */
module.exports.putData = async (payload) => {
	const id = payload.id;
	delete payload.id;
	return await connection(table.PROPERTIES.TABLE_NAME)
		.update(payload)
		.where(table.PROPERTIES.COLOUMNS.ID, id);
};

/**
 * HARD DELETE DATA! please use with carefull
 * @param {number} id
 * @returns {Promise<any>}
 */
module.exports.deleteData = async (id) => {
	return await connection(table.PROPERTIES.TABLE_NAME)
		.where(table.PROPERTIES.COLOUMNS.ID, id)
		.del();
};
