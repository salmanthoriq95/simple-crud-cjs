// @ts-check
"use strict";

const axios = require("axios").default;
const config = require("../../config/index");

module.exports = axios.create({
	baseURL: config.loginAxios.URL,
});
