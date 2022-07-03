//@ts-check
"use strict";

// eslint-disable-next-line no-unused-vars
const { Request, Response, NextFunction } = require("express");
const logger = require("../../utilities/logger");
const validators = require("./validators");
const services = require("./services");
const formatReturn = require("../../utilities/return.formatter");

/**
 * this is session Controller, validating token
 * result from service
 * @param {Request} req Request payload from express
 * @param {Response} res Response lib from express
 * @param {NextFunction} next next funtion from express, for exec next middleware
 * @returns {Promise<any>}
 */
module.exports.sessionController = async (req, res, next) => {
	try {
		// validating and formatting inputs
		const validateResult = validators.sessionValidator(req);
		// service
		const serviceResult = await services.sessionService(validateResult);

		logger.info("sessiounController");
		return res.status(200).send(
			formatReturn({
				success: true,
				message: "Session successful!",
				data: serviceResult,
			})
		);
	} catch (error) {
		next(error);
	}
};

