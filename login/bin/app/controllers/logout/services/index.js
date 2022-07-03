// @ts-check
"use strict";

const HttpExpection = require("../../../errors/HttpExpection");
const { getDataById } = require("../../../models/knex/queries/users.queries");
const tokenGenerator = require("../../../utilities/token.generator");

/**
 * @typedef {import('../validators/index').ILogoutInput} ILogoutInput
 */

/**
 * Logout services, remove token from redis
 * @param {ILogoutInput} payload
 */
module.exports.logoutService = async (payload) => {
	// Decrypt token
	// BUG: Bug when token is cant be decrypted
	const decryptToken = tokenGenerator.decryptToken(payload.TOKEN, payload.KEY);
	if (decryptToken.success && decryptToken.success === false)
		throw new HttpExpection(400, {
			message: "Invalid Token!",
		});
	const tokenValue = JSON.parse(decryptToken);
	// get data by user id
	const getDataUser = await getDataById(tokenValue.id);

	// delete token data in redis
	if (getDataUser) {
		await tokenGenerator.delTokenInRedis(
			payload.ip,
			payload.useragent,
			getDataUser.username
		);
	}
};

