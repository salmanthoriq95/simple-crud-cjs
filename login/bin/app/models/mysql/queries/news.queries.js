// @ts-check
"use strict";

const { execQuery } = require("../config");
const tableProp = require("../table.properties/news");

module.exports.getData = async (id) => {
	let sql = `select * from ${tableProp.PROPERTIES.TABLE_NAME}`;
	if (id) sql = sql + ` where ${tableProp.PROPERTIES.COLOUMNS.ID} = ${id}`;
	return await execQuery(sql);
};

module.exports.postData = async (payload) => {
	let sql = `insert into ${tableProp.PROPERTIES.TABLE_NAME} (
				${tableProp.PROPERTIES.COLOUMNS.TITLE},
				${tableProp.PROPERTIES.COLOUMNS.CONTENT},
				${tableProp.PROPERTIES.COLOUMNS.AUTHOR}
				) values (
					"${payload.title}",
					"${payload.content}",
					${payload.author === "" ? null : `"${payload.author}"`}
				)`;
	return await execQuery(sql);
};

module.exports.putData = async (payload) => {
	let sql = `update ${tableProp.PROPERTIES.TABLE_NAME} set
				${tableProp.PROPERTIES.COLOUMNS.TITLE} = "${payload.title}",
				${tableProp.PROPERTIES.COLOUMNS.CONTENT} = "${payload.content}",
				${tableProp.PROPERTIES.COLOUMNS.AUTHOR} = ${payload.author === "" ? null : `"${payload.author}"`}
				where ${tableProp.PROPERTIES.COLOUMNS.ID} = ${payload.id}
				`;
	return await execQuery(sql);
};
module.exports.deleteData = async (payload) => {
	let sql = `delete from ${tableProp.PROPERTIES.TABLE_NAME} where ${tableProp.PROPERTIES.COLOUMNS.ID} = ${payload.id}`;
	return await execQuery(sql);
};
