// @ts-check
"use strict";

module.exports.getUserData = async (usernameOrEmail) => {
	if (usernameOrEmail === "user") {
		return {
			id: 2,
			username: "user",
			isAdmin: 0,
			email: "user@user.com",
			password: "$2a$12$qDrWAwyfPwu3hhLC0xQmy.zT.UMLYfoTH8vCOdY8ZNrPGbl26LQsC",
		};
	}

	if (usernameOrEmail === "admin") {
		return {
			id: 1,
			username: "admin",
			isAdmin: 1,
			email: "admin@admin.com",
			password: "$2a$12$WVE1eY6NLs/zbC0.gGgV7uLSf.yGerJgmeycDmzX75VWiMoPFM/1a",
		};
	}

	if (
		usernameOrEmail &&
		(usernameOrEmail !== "user" || usernameOrEmail !== "admin")
	) {
		return undefined;
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
	];
};

module.exports.getDataById = async (id) => {
	if (id) {
		return { username: "admin" };
	}
	return undefined;
};
