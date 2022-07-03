// @ts-check
"use strict";

const { getUserData } = require("../../../models/knex/queries/users.queries");
const { compareHashBcrypt } = require("../../../utilities/bcrypt.hashing");
const requestLimiter = require("../../../utilities/request.limiter");
const HttpExpection = require("../../../errors/HttpExpection");
const tokenGenerator = require("../../../utilities/token.generator");

/**
 * @typedef {import('../validators/index').ILoginInput} ILoginInput
 */

/**
 * @typedef {object} ILoginService
 * @property {string} token
 * @property {string} key
 */

/**
 * service for login, if user attemp failed 5 times
 * service will block the request for a while
 * @param {ILoginInput} payload
 * @returns {Promise<ILoginService>}
 */
module.exports.loginService = async (payload) => {
	// Get user data by it username or email
	const userData = await getUserData(payload.username);
	const username =
		userData && userData.username ? userData.username : payload.username;

	// Prevent Bruteforce
	await requestLimiter.initAttempByUsername(
		username,
		payload.useragent,
		payload.ip
	);

	// throw 422 if username or email not found
	if (!userData)
		throw new HttpExpection(422, {
			message: "Login Failed! Invalid Username or Password",
		});

	// compare user password
	const isValidPassword = compareHashBcrypt(
		payload.password,
		userData.password
	);
	if (!isValidPassword)
		throw new HttpExpection(422, {
			message: "Login Failed! Invalid Username or Password",
		});

	// Create Header response
	const token = tokenGenerator.generateToken(userData.id, userData.isAdmin);

	// store token in redis
	await tokenGenerator.writeTokenInRedis(
		payload.ip,
		payload.useragent,
		username,
		token
	);

	// Login successful destroy attemp request
	await requestLimiter.deleteAttempByUsername(
		username,
		payload.useragent,
		payload.ip
	);

	return {
		token: token.data,
		key: token.key,
	};
};
