// @ts-check
"use strict";

/**
 *
 * @param {object} payload
 * @param {boolean} payload.success
 * @param {any} [payload.data]
 * @param {string} [payload.message]
 * @returns {object}
 */
module.exports = (payload) => {
	return {
		success: payload.success,
		message: payload.message,
		data: payload.data,
	};
};
