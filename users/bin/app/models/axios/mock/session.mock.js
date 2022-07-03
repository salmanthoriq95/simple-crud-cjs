//@ts-check
"use strict";

module.exports.getSession = async (payload) => {
	if (payload.token === "token-admin") {
		return {
			success: true,
			message: "Session successful!",
			data: {
				id: 1,
				isAdmin: 1,
			},
		};
	}
	if (payload.token === "token-user") {
		return {
			success: true,
			message: "Session successful!",
			data: {
				id: 2,
				isAdmin: 0,
			},
		};
	}

	return {
		success: false,
		message: "access denied",
	};
};
