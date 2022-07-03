// @ts-check
"use strict";

/**
 * @typedef {object} IReturnFormatter Format Interface for retun data
 * @property {boolean} success
 * @property {string} [message]
 * @property {any} [data]
 */

/**
 * Formatting return data for all service
 * @param {object} payload
 * @param {boolean} payload.success
 * @param {any} [payload.data]
 * @param {string} [payload.message]
 * @returns {IReturnFormatter}
 */
module.exports = (payload) => {
	return {
		success: payload.success,
		message: payload.message,
		data: payload.data,
	};
};
