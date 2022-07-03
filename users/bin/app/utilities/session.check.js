// @ts-check
"user strict";

const HttpExpection = require("../errors/HttpExpection");
const { getSession } = require("../models/axios/fetchData/session.axios");

/**
 * @typedef {object} ISessionData
 * @property {boolean} success
 * @property {string} message
 * @property {object} data
 * @property {number} data.id
 * @property {boolean} data.isAdmin
 */

/**
 * check session for every request
 * @param {object} payload
 * @param {string} payload.token
 * @param {string} payload.key
 * @param {string} payload.useragent
 * @param {string} payload.ip
 * @returns {Promise<ISessionData>}
 */
module.exports.sessionCheck = async (payload) => {
	const sessionData = await getSession({
		token: payload.token,
		key: payload.key,
		useragent: payload.useragent,
		ip: payload.ip,
	});
	if (!sessionData.success)
		throw new HttpExpection(401, { message: "Invalid Token!" });
	return sessionData;
};
