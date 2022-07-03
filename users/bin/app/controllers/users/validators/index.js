// @ts-check
"use strict";

const Joi = require("joi");
const HttpExpection = require("../../../errors/HttpExpection");

/**
 * @typedef {object} IGetInput Input interface for get request
 * @property {number} [debug]
 * @property {number} [trace]
 * @property {string} token
 * @property {string} key
 * @property {string} useragent
 * @property {string} ip
 * @property {number} [id]
 */

/**
 * @typedef {object} IUsersBody
 * @property {number} [debug]
 * @property {number} [trace]
 * @property {string} token
 * @property {string} key
 * @property {string} useragent
 * @property {string} ip
 * @property {number} [id]
 * @property {string} username
 * @property {boolean} isAdmin
 * @property {string} email
 * @property {string} password
 */

/**
 * validating input request for get usrs data
 * @param {*} payload
 * @returns {IGetInput}
 */
module.exports.getValidator = (payload) => {
	const schema = Joi.object({
		debug: Joi.number().valid(1).optional(),
		trace: Joi.number().valid(1).optional(),
		token: Joi.string().required(),
		key: Joi.string().required(),
		ip: Joi.string().required(),
		useragent: Joi.string(),
		id: Joi.number().optional(),
	});

	const validate = schema.validate({
		debug: payload.query.debug,
		trace: payload.query.trace,
		token: payload.headers["token"],
		key: payload.headers["key"],
		ip: payload.ip,
		useragent: payload.headers["user-agent"],
		id: payload.params.id,
	});

	if (validate.error) {
		throw new HttpExpection(400, {
			message: "Fail to Validate",
			data: validate.value,
		});
	}

	return validate.value;
};

/**
 * Validating and formatting input for add new data.
 * only admin can add user data
 * @param {*} payload
 * @returns {IUsersBody}
 */
module.exports.postValidator = (payload) => {
	const schema = Joi.object({
		debug: Joi.number().valid(1).optional(),
		trace: Joi.number().valid(1).optional(),
		token: Joi.string().required(),
		key: Joi.string().required(),
		ip: Joi.string().required(),
		useragent: Joi.string(),
		username: Joi.string().required(),
		isAdmin: Joi.boolean().required(),
		email: Joi.string().email().required(),
		password: Joi.string().required(),
	});

	const validate = schema.validate({
		debug: payload.query.debug,
		trace: payload.query.trace,
		token: payload.headers["token"],
		key: payload.headers["key"],
		ip: payload.ip,
		useragent: payload.headers["user-agent"],
		username: payload.body.username,
		isAdmin: payload.body.isAdmin,
		email: payload.body.email,
		password: payload.body.password,
	});

	if (validate.error) {
		throw new HttpExpection(400, {
			message: "Fail to Validate",
			data: validate.value,
		});
	}

	return validate.value;
};

/**
 * Validating and formatting input for edit the data.
 * only admin can edit user data
 * @param {*} payload
 * @returns {IUsersBody}
 */
module.exports.putValidator = (payload) => {
	const schema = Joi.object({
		debug: Joi.number().valid(1).optional(),
		trace: Joi.number().valid(1).optional(),
		token: Joi.string().required(),
		key: Joi.string().required(),
		ip: Joi.string().required(),
		useragent: Joi.string(),
		id: Joi.number().required(),
		username: Joi.string().required(),
		isAdmin: Joi.boolean().required(),
		email: Joi.string().email().required(),
		password: Joi.string().required(),
	});

	const validate = schema.validate({
		debug: payload.query.debug,
		trace: payload.query.trace,
		token: payload.headers["token"],
		key: payload.headers["key"],
		ip: payload.ip,
		useragent: payload.headers["user-agent"],
		id: payload.params.id,
		username: payload.body.username,
		isAdmin: payload.body.isAdmin,
		email: payload.body.email,
		password: payload.body.password,
	});

	if (validate.error) {
		throw new HttpExpection(400, {
			message: "Fail to Validate",
			data: validate.value,
		});
	}

	return validate.value;
};

/**
 * Validating and formatting delete input.
 * only admin can delete data of user
 * @param {*} payload
 * @returns {IGetInput}
 */
module.exports.deleteValidator = (payload) => {
	const schema = Joi.object({
		debug: Joi.number().valid(1).optional(),
		trace: Joi.number().valid(1).optional(),
		token: Joi.string().required(),
		key: Joi.string().required(),
		ip: Joi.string().required(),
		useragent: Joi.string(),
		id: Joi.number().required(),
	});

	const validate = schema.validate({
		debug: payload.query.debug,
		trace: payload.query.trace,
		token: payload.headers["token"],
		key: payload.headers["key"],
		ip: payload.ip,
		useragent: payload.headers["user-agent"],
		id: payload.params.id,
	});

	if (validate.error) {
		throw new HttpExpection(400, {
			message: "Fail to Validate",
			data: validate.value,
		});
	}

	return validate.value;
};

