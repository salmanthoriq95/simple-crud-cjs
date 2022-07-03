//@ts-check
"use strict";

// eslint-disable-next-line no-unused-vars
const { Request, Response, NextFunction } = require("express");
const logger = require("../../utilities/logger");
const validators = require("./validators");
const services = require("./services");
const formatReturn = require("../../utilities/return.formatter");

/**
 * this is logout Controller, validating all input and returning
 * result from service
 * @param {Request} req Request payload from express
 * @param {Response} res Response lib from express
 * @param {NextFunction} next next funtion from express, for exec next middleware
 * @returns {Promise<any>}
 */
module.exports.logoutController = async (req, res, next) => {
	try {
		// validating and formatting inputs
		const validateResult = validators.logoutValidator(req);
		// service
		await services.logoutService(validateResult);

		logger.info("logoutController");
		return res.status(200).send(
			formatReturn({
				success: true,
				message: "Logout successful!",
			})
		);
	} catch (error) {
		next(error);
	}
};

