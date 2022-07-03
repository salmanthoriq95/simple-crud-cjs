//@ts-check
"use strict";

// eslint-disable-next-line no-unused-vars
const { Request, Response, NextFunction } = require("express");
const logger = require("../../utilities/logger");
const validators = require("./validators");
const services = require("./services");
const formatReturn = require("../../utilities/return.formatter");

/**
 * this is login Controller, validating all input and returning
 * result from service
 * @param {Request} req Request payload from express
 * @param {Response} res Response lib from express
 * @param {NextFunction} next next funtion from express, for exec next middleware
 * @returns {Promise<any>}
 */
module.exports.loginController = async (req, res, next) => {
	try {
		// validating and formatting inputs
		const validateResult = validators.loginValidator(req);
		// service
		const serviceResult = await services.loginService(validateResult);
		res.cookie("TOKEN", serviceResult.token, {
			maxAge: 1209600,
			httpOnly: true,
		});
		res.cookie("KEY", serviceResult.key, { maxAge: 1209600, httpOnly: true });
		logger.info("loginController");
		return res.status(200).send(
			formatReturn({
				success: true,
				message: "Login successful!",
			})
		);
	} catch (error) {
		next(error);
	}
};
