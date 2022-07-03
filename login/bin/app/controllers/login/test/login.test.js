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

describe("HTTP Request /login", () => {
	it("/login equal to 200", (done) => {
		request(app)
			.post("/login")
			.send({ username: "admin", password: "admin" })
			.expect(200, done);
	});
	it("/login equal to 422", (done) => {
		request(app)
			.post("/login")
			.set("useragent", "mamam")
			.send({ username: "admina", password: "admin" })
			.expect(422, done);
	});
});
