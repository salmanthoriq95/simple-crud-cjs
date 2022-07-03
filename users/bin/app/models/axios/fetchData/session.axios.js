// @ts-check
"use strict";

const axiosInstance = require("../config");

/**
 * Get data session of user
 * @param {object} payload
 * @param {string} payload.token
 * @param {string} payload.key
 * @param {string} payload.ip
 * @param {string} payload.useragent
 * @returns
 */
module.exports.getSession = async (payload) => {
	const data = await axiosInstance.get("/session?debug=1", {
		headers: {
			token: payload.token,
			key: payload.key,
			ip: payload.ip,
			"User-Agent": payload.useragent,
		},
	});

	return data.data;
};
