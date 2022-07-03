// @ts-check
"use strict";

const { redis } = require("../redis.config");

/**
 * queries to redis to get data by key name
 * @param {string} key
 * @returns {Promise<any>}
 */
module.exports.getDataByKeyName = async (key) => {
	return await redis.get(key);
};

/**
 * store data to redis using key-value case, it can be overwrite old data if data already exist
 * @param {object} payload
 * @param {string} payload.keyName
 * @param {string} payload.value
 * @param {string} payload.option
 * @param {number} payload.time
 * @returns {Promise<any>}
 */
module.exports.setDataByKeyValue = async (payload) => {
	return await redis.set(
		payload.keyName,
		payload.value,
		payload.option,
		payload.time
	);
};

/**
 * delete data by key name in redis
 * @param {string} key
 * @returns {Promise<*>}
 */
module.exports.delDataByKey = async (key) => {
	return await redis.del(key);
};
