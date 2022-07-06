// @ts-check
"use strict";

const { getDataById } = require("../../../models/knex/queries/users.queries");
const HttpExpection = require("../../../errors/HttpExpection");
const tokenGenerator = require("../../../utilities/token.generator");

/**
 * @typedef {import('../validators/index').ISessionInput} ISessionInput
 */

/**
 * service for login, if user attemp failed 5 times
 * service will block the request for a while
 * @param {ISessionInput} payload
 * @returns {Promise<any>}
 */
module.exports.sessionService = async (payload) => {
	// decrypt token
	const decryptToken = tokenGenerator.decryptToken(payload.TOKEN, payload.KEY);
	// when token invalid
	if (decryptToken.success && decryptToken.success === false)
		throw new HttpExpection(401, {
			message: "Invalid Token!",
		});
	const tokenValue = JSON.parse(decryptToken);
	// get data by user id
	const getDataUser = await getDataById(tokenValue.id);
	// get data by ip and useragent in redis
	const getTokenInRedis = await tokenGenerator.getTokenInRedis(
		"",
		payload.useragent,
		getDataUser.username
	);

	// when token is not same throw 401
	if (
		(getTokenInRedis && getTokenInRedis.data !== payload.TOKEN) ||
		getTokenInRedis.key !== payload.KEY
	) {
		throw new HttpExpection(401, {
			message: "Invalid Token!",
		});
	}

	// return data id and role
	return tokenValue;
};
