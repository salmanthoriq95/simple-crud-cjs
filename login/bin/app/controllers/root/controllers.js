//@ts-check
"use strict";

// eslint-disable-next-line no-unused-vars
const { Request, Response, NextFunction } = require("express");
const logger = require("../../utilities/logger");
const validators = require("./validators");
const services = require("./services");

/**
 * hello this is get root
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns
 */
module.exports.getController = async (req, res, next) => {
  try {
    // validating and formatting inputs
    const validateResult = validators.getValidator(req);
    // service
    const serviceResult = await services.getService(validateResult);
    logger.info("getController");
    return res.status(200).send(serviceResult);
  } catch (error) {
    next(error);
  }
};

module.exports.postController = async (req, res, next) => {
  try {
    // validating and formatting inputs
    const validateResult = validators.postValidator(req);
    // service
    const serviceResult = await services.postService(validateResult);
    logger.info("postController");
    return res.status(200).send(serviceResult);
  } catch (error) {
    next(error);
  }
};
module.exports.putController = async (req, res, next) => {
  try {
    // validating and formatting inputs
    const validateResult = validators.putValidator(req);
    // service
    const serviceResult = await services.putService(validateResult);
    logger.info("putController");
    return res.status(200).send(serviceResult);
  } catch (error) {
    next(error);
  }
};
module.exports.deleteController = async (req, res, next) => {
  try {
    // validating and formatting inputs
    const validateResult = validators.deleteValidator(req);
    // service
    const serviceResult = await services.deleteService(validateResult);
    logger.info("deleteController");
    return res.status(200).send(serviceResult);
  } catch (error) {
    next(error);
  }
};
