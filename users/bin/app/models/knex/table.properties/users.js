// @ts-check
"use strict";

/**
 * @class
 * @classdesc
 * This Class for get all Users table properties
 * can usefull to create query for users table
 */
class UsersTable {
	/**
	 * this  constructr is define all users tables properties
	 * @constructor
	 */
	constructor() {
		this.PROPERTIES = {
			TABLE_NAME: "users",
			COLOUMNS: {
				ID: "id",
				username: "username",
				password: "password",
				email: "email",
			},
		};
	}
}

const usersTable = new UsersTable();
module.exports = usersTable;
module.exports.default = usersTable;
module.exports.properties = usersTable.PROPERTIES;
