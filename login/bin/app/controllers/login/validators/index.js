// @ts-check
"use strict";

const Joi = require("joi");
const HttpExpection = require("../../../errors/HttpExpection");

/**
 * @typedef {object} ILoginInput Format Interface for Login Input
 * @property {number} [debug]
 * @property {number} [trace]
 * @property {string} username
 * @property {string} password
 * @property {string} ip
 * @property {string} useragent
 */

/**
 * validating and formatting all input request
 * @param {*} payload
 * @returns {ILoginInput}
 */
module.exports.loginValidator = (payload) => {
	const schema = Joi.object({
		debug: Joi.number().valid(1).optional(),
		trace: Joi.number().valid(1).optional(),
		username: Joi.string().required(),
		password: Joi.string().required(),
		ip: Joi.string(),
		useragent: Joi.string(),
	});

	const validate = schema.validate({
		debug: payload.query.debug,
		trace: payload.query.trace,
		username: payload.body.username,
		password: payload.body.password,
		ip: payload.ip,
		useragent: payload.headers["user-agent"],
	});

	if (validate.error) {
		throw new HttpExpection(400, {
			message: "Fail to Validate",
		});
	}

	return validate.value;
};
