// @ts-check
"use strict";

const connection = require("../config");
const table = require("../table.properties/news");

module.exports.getData = async (id) => {
	return await connection(table.PROPERTIES.TABLE_NAME).modify((currentQuery) => {
		if (id) currentQuery.where(table.PROPERTIES.COLOUMNS.ID, id);
	});
};
module.exports.postData = async (payload) => {
	return await connection(table.PROPERTIES.TABLE_NAME).insert(payload);
};
module.exports.putData = async (payload) => {
	const id = payload.id;
	delete payload.id;
	return await connection(table.PROPERTIES.TABLE_NAME).update(payload).where(table.PROPERTIES.COLOUMNS.ID, id);
};
module.exports.deleteData = async (id) => {
	return await connection(table.PROPERTIES.TABLE_NAME).where(table.PROPERTIES.COLOUMNS.ID, id).del();
};
