// @ts-check
"use strict";

const connection = require("../config");
const table = require("../table.properties/users");

module.exports.getData = async (id) => {
	if (id) {
		return {
			id: 1,
			username: "admin",
			isAdmin: 1,
			email: "admin@admin.com",
			password: "$2a$12$WVE1eY6NLs/zbC0.gGgV7uLSf.yGerJgmeycDmzX75VWiMoPFM/1a",
		};
	}
	return [
		{
			id: 1,
			username: "admin",
			isAdmin: 1,
			email: "admin@admin.com",
			password: "$2a$12$WVE1eY6NLs/zbC0.gGgV7uLSf.yGerJgmeycDmzX75VWiMoPFM/1a",
		},
		{
			id: 2,
			username: "user",
			isAdmin: 0,
			email: "user@user.com",
			password: "$2a$12$qDrWAwyfPwu3hhLC0xQmy.zT.UMLYfoTH8vCOdY8ZNrPGbl26LQsC",
		},
		{
			id: 3,
			username: "salman",
			isAdmin: 1,
			email: "salman@admin.com",
			password: "$2a$12$6DAh3vdQapI3lXYMd8hDTOm8AZs2Lj.gC7uvdfVAKBjnT4rmO9nAO",
		},
	];
};

module.exports.postData = async (payload) => {
	return;
};

module.exports.putData = async (payload) => {
	return;
};

module.exports.deleteData = async (id) => {
	return;
};
