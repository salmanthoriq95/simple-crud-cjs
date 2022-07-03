//@ts-check
"use strict";

// Import Native Crypto from nodeJs
const crypto = require("crypto");
const algorithm = "aes-256-cbc";

// Import Crypto-Js from npm
const CryptoJs = require("crypto-js");
const AES = require("crypto-js/aes");

// import redis
const redis = require("../models/redis/queries/redis.queries");

class TokenGenerator {
	/**
	 * create new token
	 * @param {number} id
	 * @param {string} isAdmin
	 * @returns {{data: string, key: string}}
	 */
	generateToken(id, isAdmin) {
		// initiate token value
		const rawData = {
			id,
			isAdmin,
		};

		// first encrypt using native nodeJs
		const firstEncryption = this.encryptCryptoNative(JSON.stringify(rawData));

		// second encryption use crypto-js
		const encryptedData = this.encryptCryptoJs(JSON.stringify(firstEncryption));

		return encryptedData;
	}

	/**
	 * decrypt the token
	 * @param {string} token
	 * @param {string} key
	 * @returns {*}
	 */
	decryptToken(token, key) {
		try {
			// decrypt use crypto-js
			const firstDecrypt = this.decrptCryptoJs(token, key);
			const firstDecrptedData = JSON.parse(JSON.parse(firstDecrypt.toString()));

			// decrypt using native nodeJS
			const decryptData = this.decryptCryptoNative(firstDecrptedData);

			return decryptData;
		} catch (err) {
			return { success: false };
		}
	}

	/**
	 * encrypt message using crpto-js npm
	 * @param {*} rawData
	 * @returns {{data: string, key:string}}
	 */
	encryptCryptoJs(rawData) {
		// generate random key
		const randomString = this.randomStringGenerator(300);

		// convert into string
		const data = JSON.stringify(rawData);

		// encrypt message
		const rawEncrypted = AES.encrypt(data, randomString).toString();

		// escape special character
		const encrypted = rawEncrypted
			.replace(/\+/g, "p1L2u3S")
			.replace(/\//g, "s1L2a3S4h")
			.replace(/=/g, "e1Q2u3A4l");

		return {
			data: encrypted,
			key: randomString,
		};
	}

	/**
	 * decrypt data using crypto-js npm
	 * @param {string} encrypedData
	 * @param {string} key
	 * @returns {string | boolean}
	 */
	decrptCryptoJs(encrypedData, key) {
		// Decrypt data
		const dataCrypt = encrypedData
			.replace(/p1L2u3S/g, "+")
			.replace(/s1L2a3S4h/g, "/")
			.replace(/e1Q2u3A4l/g, "=");
		const decryptedData = AES.decrypt(dataCrypt, key);
		const data = decryptedData.toString(CryptoJs.enc.Utf8);

		if (!data || data === "") return false;

		return data;
	}

	/**
	 * Generate random string with value [A-Za-z0-9]
	 * @see https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
	 * @param {number} length word length that will return
	 * @returns {string} random string
	 */
	randomStringGenerator(length) {
		let result = "";
		let characters =
			"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		let charactersLength = characters.length;
		for (let i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	}

	/**
	 * encrypting string use crypto NodeJs native
	 * @param {string} text
	 * @returns {{iv: string, encryptedData: string, key: string}}
	 */
	encryptCryptoNative(text) {
		// Generate random key
		const key = crypto.randomBytes(32);
		const iv = crypto.randomBytes(16);

		let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
		let encrypted = cipher.update(text);
		encrypted = Buffer.concat([encrypted, cipher.final()]);
		return {
			iv: iv.toString("hex"),
			encryptedData: encrypted.toString("hex"),
			key: key.toString("hex"),
		};
	}

	/**
	 * decrypring data using crypto NodeJs native
	 * @param {{iv: string, encryptedData: string, key: string}} text
	 * @returns {string}
	 */
	decryptCryptoNative(text) {
		let iv = Buffer.from(text.iv, "hex");
		let key = Buffer.from(text.key, "hex");
		let encryptedText = Buffer.from(text.encryptedData, "hex");
		let decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(key), iv);
		let decrypted = decipher.update(encryptedText);
		decrypted = Buffer.concat([decrypted, decipher.final()]);
		return decrypted.toString();
	}

	/**
	 * store token in redis
	 * @param {string} ip
	 * @param {string} useragent
	 * @param {string} username
	 * @param {{data: string, key:string}} tokenData
	 */
	async writeTokenInRedis(ip, useragent, username, tokenData) {
		const data = JSON.stringify(tokenData);
		await redis.setDataByKeyValue({
			keyName: `${ip}-${useragent}-${username}`,
			value: data,
			option: "px",
			time: 86400000,
		});
	}

	/**
	 * check token in redis
	 * @param {string} ip
	 * @param {string} useragent
	 * @return {Promise<{data: string, key:string}>} tokenData
	 */
	async getTokenInRedis(ip, useragent, username) {
		const tokenData = await redis.getDataByKeyName(
			`${ip}-${useragent}-${username}`
		);
		const data = JSON.parse(tokenData);
		return data;
	}

	/**
	 * deleting token in redis by it keyname
	 * @param {string} ip
	 * @param {string} useragent
	 * @param {string} username
	 */
	async delTokenInRedis(ip, useragent, username) {
		const tokenData = await redis.delDataByKey(
			`${ip}-${useragent}-${username}`
		);
	}
}

module.exports = new TokenGenerator();
