// @ts-check
"use strict";

// Import config
const config = require("../../config");

// import redis
const Redis = require("ioredis");
// @ts-ignore
const redis = new Redis(+config.redis.PORT);

module.exports = { redis };
