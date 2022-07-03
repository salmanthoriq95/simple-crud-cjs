// @ts-check
"use strict";

const Joi = require("joi");
const HttpExpection = require("../../../errors/HttpExpection");

module.exports.getValidator = (payload) => {
	const schema = Joi.object({
		debug: Joi.number().valid(1).optional(),
		trace: Joi.number().valid(1).optional(),
		id: Joi.number().optional(),
	});

	const validate = schema.validate({
		debug: payload.query.debug,
		trace: payload.query.trace,
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

module.exports.postValidator = (payload) => {
	const schema = Joi.object({
		debug: Joi.number().valid(1).optional(),
		trace: Joi.number().valid(1).optional(),
		title: Joi.string().required(),
		content: Joi.string().required(),
		author: Joi.string().optional().allow("", null),
	});

	const validate = schema.validate({
		debug: payload.query.debug,
		trace: payload.query.trace,
		title: payload.body.title,
		content: payload.body.content,
		author: payload.body.author,
	});

	if (validate.error) {
		throw new HttpExpection(400, {
			message: "Fail to Validate",
			data: validate.value,
		});
	}

	return validate.value;
};

module.exports.putValidator = (payload) => {
	const schema = Joi.object({
		debug: Joi.number().valid(1).optional(),
		trace: Joi.number().valid(1).optional(),
		title: Joi.string().required(),
		content: Joi.string().required(),
		author: Joi.string().optional().allow("", null),
		id: Joi.number().required(),
	});

	const validate = schema.validate({
		debug: payload.query.debug,
		trace: payload.query.trace,
		title: payload.body.title,
		content: payload.body.content,
		author: payload.body.author,
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

module.exports.deleteValidator = (payload) => {
	const schema = Joi.object({
		debug: Joi.number().valid(1).optional(),
		trace: Joi.number().valid(1).optional(),
		id: Joi.number().required(),
	});

	const validate = schema.validate({
		debug: payload.query.debug,
		trace: payload.query.trace,
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
