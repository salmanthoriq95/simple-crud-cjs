// @ts-check
"use strict";

const Joi = require("joi");
const HttpExpection = require("../../../errors/HttpExpection");

/**
 * @typedef {object} ILogoutInput Format Interface for Login Input
 * @property {number} [debug]
 * @property {number} [trace]
 * @property {string} ip
 * @property {string} useragent
 * @property {string} TOKEN
 * @property {string} KEY
 */

/**
 * validating and formatting all input request
 * @param {*} payload
 * @returns {ILogoutInput}
 */
module.exports.logoutValidator = (payload) => {
	const schema = Joi.object({
		debug: Joi.number().valid(1).optional(),
		trace: Joi.number().valid(1).optional(),
		ip: Joi.string(),
		useragent: Joi.string(),
		TOKEN: Joi.string().required(),
		KEY: Joi.string().required(),
	});

	const validate = schema.validate({
		debug: payload.query.debug,
		trace: payload.query.trace,
		TOKEN: payload.headers["token"],
		KEY: payload.headers["key"],
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

