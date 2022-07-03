//@ts-check
"use strict";

const request = require("supertest");
const server = require("../../../index");
const dotenv = require("dotenv");
const path = require("path");
const app = require("express")();

jest.mock("../../../models/knex/queries/users.queries", () =>
	require("../../../models/knex/mock/users.mock")
);

jest.mock("../../../models/redis/queries/redis.queries", () =>
	require("../../../models/redis/mock/redis.mock")
);

beforeAll(() => {
	dotenv.config({
		path: path.resolve(__dirname, `'../../../../../env/test.env'`),
	});
	server(app);
});

afterAll(() => {
	jest.resetModules();
});

describe("HTTP Request /logout", () => {
	it("/login equal to 200", (done) => {
		request(app)
			.delete("/logout")
			.set(
				"token",
				"U2FsdGVkX19lyJWXeMJiNhVf64O8hEZn1tLPpyWn1BnlNJ7H5Hb1ytWGQJO1n1At6sTLCQiXw9xAcxwCneccB1n2hG2QtsxwcvhPUuVqOdTdWV7x2eiClQ5pu4eEkCRuVcbXPcnlU6IOTyWGaWDryoGB8qfJuRPSDHirUrjKtkHDYX3tyjABC38HeHxzn0adTuvjrCDWk81s2cSv6W3HxP2EP6FE9Rmp1L2u3SEbzpN1s1L2a3S4hkkp1L2u3S5GkmT3s1Ok2z8N9TwCp1L2u3Sxrp1L2u3SazSC64Spu3NmK4iMFqeTdf5Qa2h6Ycsf7cp1L2u3See1Mf4iwgy32c7CCibok2tmmbTX6Q"
			)
			.set(
				"key",
				"FRrNk59FyJG6htLX5GTFTO6ztdKrC3SmcGuopFT5qgPcap5fjxFIzHVgxzS67SwGWGy9Ahhoy3dR0CnWgkOsuRDxItH5wpZMvdjmsnf3gmt6qjtk7Tpfa9bbLUsIdNLv5PafSulngpSIv1TW8pAcQZVxhxXWhyuy8EK9I1ZryrJ23qn0P8NIOjUdyY4FxgW4C2oEU16FbAVxx4LuJQdUfJZWoMrdmyBAIctw4igZE3ngNA49OePs8JWU8NPAt88ngQfibuRSGVErVZRWbGWSf5lUKkqwwRhdBNUUVxeEY7wo"
			)
			.expect(200, done);
	});
});

