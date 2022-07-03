//@ts-check
"use strict";

const config = require("../config");

// BCRYPRT
const bcrypt = require("bcryptjs");
const saltRound = config.bcrypt.ROUND;
let salt = bcrypt.genSaltSync(+saltRound);

/**
 * Create bcrypt hash
 * @param {string} plainText text that want to hash
 * @returns {string} hashed string
 */
module.exports.createHashBcrypt = (plainText) => {
	return bcrypt.hashSync(plainText, salt);
};

/**
 * comparing hash and text,
 * @param {string} plainText
 * @param {string} hash
 * @returns {boolean}
 */
module.exports.compareHashBcrypt = (plainText, hash) => {
	const result = bcrypt.compareSync(plainText, hash);
	return result;
};
