// @ts-check
"use strict";

/**
 * ID: </br>
 * Error constructor default template yang di wariskan dari
 * constructor error bawaan nodejs, digunakan untuk debugging. </br></br>
 *
 * EN: <br>
 * default error constructor template inhereted by Error connstructor
 * nodejs, use for debugging.
 *
 * @class
 * @extends {Error}
 * @memberof ErrorHandler
 * @inner
 */
class HttpExpection extends Error {
	/**
	 * @constructor
	 * @param {number} statusCode
	 * @param {object} httpData
	 * @param {string} httpData.message
	 * @param {any} [httpData.data=undefined]
	 * @inheritdoc
	 */
	constructor(statusCode, httpData) {
		super();
		this.name = "HttpExpection";
		this.statusCode /** @type {number} */ = statusCode;
		this.data /** @type {any[]} */ = httpData.data || undefined;
		this.message = httpData.message;
	}
}

module.exports = HttpExpection;
