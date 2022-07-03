// @ts-check
"use strict";

const Joi = require("joi");
const HttpExpection = require("../../../errors/HttpExpection");

/**
 * @typedef {object} ISessionInput Format Interface for Login Input
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
 * @returns {ISessionInput}
 */
module.exports.sessionValidator = (payload) => {
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
		ip: payload.ip,
		useragent: payload.headers["user-agent"],
		TOKEN: payload.headers["token"],
		KEY: payload.headers["key"],
	});

	if (validate.error) {
		throw new HttpExpection(400, {
			message: "Fail to Validate",
		});
	}

	return validate.value;
};
