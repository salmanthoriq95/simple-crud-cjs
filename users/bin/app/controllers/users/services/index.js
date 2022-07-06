// @ts-check
"use strict";

const formatReturn = require("../../../utilities/return.formatter");
const {
	getData,
	postData,
	putData,
	deleteData,
} = require("../../../models/knex/queries/users.queries");
const { sessionCheck } = require("../../../utilities/session.check");
const HttpExpection = require("../../../errors/HttpExpection");
const { createHashBcrypt } = require("../../../utilities/bcrypt.hashing");

/**
 * @typedef {import('../validators/index').IGetInput} IGetInput
 * @typedef {import('../validators/index').IUsersBody} IUsersBody
 */

/**
 * Get data service, returning data of users
 * @param {IGetInput} payload
 * @returns {Promise<any>}
 */
module.exports.getService = async (payload) => {
	// validating session
	const sessionData = await sessionCheck({
		ip: payload.ip,
		useragent: payload.useragent,
		token: payload.token,
		key: payload.key,
	});

	if (!sessionData.data.isAdmin && !payload.id)
		throw new HttpExpection(401, { message: "Access denied!" });

	if (
		!sessionData.data.isAdmin &&
		payload.id &&
		+payload.id !== +sessionData.data.id
	)
		throw new HttpExpection(401, { message: "Access denied!" });

	const dataUser = await getData(payload.id);

	return formatReturn({
		success: true,
		data: dataUser,
		message: "success get data",
	});
};

/**
 * service for add users data, only admin can do it.
 * @param {IUsersBody} payload
 * @returns {Promise<any>}
 */
module.exports.postService = async (payload) => {
	// validating session
	const sessionData = await sessionCheck({
		ip: payload.ip,
		useragent: payload.useragent,
		token: payload.token,
		key: payload.key,
	});

	if (!sessionData.data.isAdmin)
		throw new HttpExpection(401, { message: "Access denied!" });

	const getAllData = await getData();

	for (const keyName in getAllData) {
		const currentData = getAllData[keyName];
		if (
			currentData.username === payload.username ||
			currentData.email === payload.email
		)
			throw new HttpExpection(409, {
				message: "Username or Email already registered!",
			});
	}

	const password = createHashBcrypt(payload.password);

	await postData({
		username: payload.username,
		email: payload.email,
		isAdmin: payload.isAdmin,
		password,
	});

	return formatReturn({ success: true, message: "success add data" });
};

/**
 * service for add users data, only admin can do it.
 * @param {IUsersBody} payload
 * @returns {Promise<any>}
 */
module.exports.putService = async (payload) => {
	// validating session
	const sessionData = await sessionCheck({
		ip: payload.ip,
		useragent: payload.useragent,
		token: payload.token,
		key: payload.key,
	});

	if (!sessionData.data.isAdmin)
		throw new HttpExpection(401, { message: "Access denied!" });

	const getAllData = await getData();

	for (const keyName in getAllData) {
		const currentData = getAllData[keyName];
		if (currentData.id === payload.id) continue;
		if (
			currentData.username === payload.username ||
			currentData.email === payload.email
		)
			throw new HttpExpection(409, {
				message: "Username or Email already registered!",
			});
	}

	const password = createHashBcrypt(payload.password);

	await putData({
		id: payload.id,
		username: payload.username,
		isAdmin: payload.isAdmin,
		email: payload.email,
		password,
	});

	return formatReturn({ success: true, message: "success edit data" });
};

/**
 * delete data service, only admin can delete data
 * @param {IGetInput} payload
 * @returns {Promise<any>}
 */
module.exports.deleteService = async (payload) => {
	// validating session
	const sessionData = await sessionCheck({
		ip: payload.ip,
		useragent: payload.useragent,
		token: payload.token,
		key: payload.key,
	});

	if (!sessionData.data.isAdmin || !payload.id)
		throw new HttpExpection(401, { message: "Access denied!" });

	await deleteData(payload.id);

	return formatReturn({ success: true, message: "success delete data" });
};
