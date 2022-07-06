// @ts-check
"use strict";

// Import config
const config = require("../../config");

// import redis
const Redis = require("ioredis");
// @ts-ignore
const redis = new Redis({ host: "redis", port: +config.redis.PORT });

module.exports = { redis };
