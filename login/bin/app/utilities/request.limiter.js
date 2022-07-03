// @ts-check
"use strict";

// Import config
const config = require("../config");

// Import error handler
const HttpExpection = require("../errors/HttpExpection");

// import redis
const limiterQueries = require("../models/redis/queries/redis.queries");

const ATTEMP_MAX = 5;

/**
 * generate time to return to user
 * @param {number} timeInSec
 * @returns {string}
 */
const generateBannedTime = (timeInSec) => {
	let timeStr = `${timeInSec} seconds`;

	if (timeInSec > 60) {
		const timeInMin = Math.floor(timeInSec / 60);
		const modTime = timeInSec % 60;
		timeStr = `${timeInMin} minutes`;
		if (modTime !== 0) timeStr = `${timeStr} ${modTime} seconds`;
	}

	return timeStr;
};

/**
 * create new data in redis or add attemp trial
 * @param {string} username
 * @param {string} useragent
 * @param {string} ip
 */
module.exports.initAttempByUsername = async (username, useragent, ip) => {
	// Search old data by username and compare the time request
	const searchData = await limiterQueries.getDataByKeyName(
		`${username}-${useragent}-${ip}`
	);

	if (searchData !== null || searchData) {
		// parsing data from redis
		const dataFromRedis = JSON.parse(searchData);
		// add attemp trial
		dataFromRedis.attempCount = dataFromRedis.attempCount + 1;

		// compare time request
		const attempCount = dataFromRedis.attempCount;
		const fiveMinAfter = dataFromRedis.startAttemp + 1000 * 60 * 5;
		const currentTime = new Date().getTime();

		// when request still bann
		if (dataFromRedis.endBan && currentTime <= dataFromRedis.endBan) {
			const bannedTime = Math.ceil((dataFromRedis.endBan - currentTime) / 1000);
			const bannedTimeReturn = generateBannedTime(+bannedTime);
			throw new HttpExpection(429, {
				message: `Too many login attempts. Please try again in ${bannedTimeReturn}`,
			});
		}

		// when too 5 times trial in 5 minutes block the request
		if (currentTime <= fiveMinAfter && attempCount === ATTEMP_MAX) {
			dataFromRedis.startAttemp = currentTime;
			dataFromRedis.nextAttemp === 0
				? (dataFromRedis.nextAttemp = 5)
				: (dataFromRedis.nextAttemp = dataFromRedis.nextAttemp * 2);
			dataFromRedis.attempCount = 1;

			dataFromRedis.endBan =
				dataFromRedis.nextAttemp * 1000 + new Date().getTime();
			// throw long time for next attemp
			await limiterQueries.setDataByKeyValue({
				keyName: `${username}-${useragent}-${ip}`,
				value: JSON.stringify(dataFromRedis),
				option: "PX",
				time: +fiveMinAfter,
			});
			const bannedTimeReturn = generateBannedTime(++dataFromRedis.nextAttemp);
			throw new HttpExpection(429, {
				message: `Too many login attempts. Please try again in ${bannedTimeReturn}`,
			});
		}

		await limiterQueries.setDataByKeyValue({
			keyName: `${username}-${useragent}-${ip}`,
			value: JSON.stringify(dataFromRedis),
			option: "PX",
			time: +fiveMinAfter,
		});
	} else {
		// generate new data to store in redis
		const rawData = {
			startAttemp: new Date().getTime(),
			attempCount: 1,
			nextAttemp: 0,
		};

		const fiveMinAfter = rawData.attempCount + 1000 * 60 * 5;

		// store attemp trial to redis
		const data = JSON.stringify(rawData);
		await limiterQueries.setDataByKeyValue({
			keyName: `${username}-${useragent}-${ip}`,
			value: data,
			option: "PX",
			time: +fiveMinAfter,
		});
	}
};

/**
 * destroy attemp trial which is store in redis, by username
 * @param {string} userName
 * @param {string} useragent
 * @param {string} ip
 */
module.exports.deleteAttempByUsername = async (userName, useragent, ip) => {
	await limiterQueries.delDataByKey(`${userName}-${useragent}-${ip}`);
};

/**
 * // NOTE : HOW TO RUN REDIS IN WINDOWS 10
 *
 * make sure redis installed in windows, @see : https://youtu.be/_nFwPTHOMIY
 * Once installed, you can start, stop, and restart the server:
 * $ sudo service redis-server start
 * $ sudo service redis-server stop
 * $ sudo service redis-server restart
 */
