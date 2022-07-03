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

jest.mock("../../../models/axios/fetchData/session.axios", () =>
	require("../../../models/axios/mock/session.mock")
);

const userToken = "token-user";
const adminToken = "token-admin";
const userKey = "key-user";
const adminKey = "key-admin";

beforeAll(() => {
	dotenv.config({
		path: path.resolve(__dirname, `'../../../../../env/test.env'`),
	});
	server(app);
});

afterAll(() => {
	jest.resetModules();
});

describe("HTTP Request get /users", () => {
	it("Get /users equal 200 with auth admin", (done) => {
		request(app)
			.get("/users")
			.set("token", adminToken)
			.set("key", adminKey)
			.expect(200, done);
	});

	it("Get /users equal 401 with auth user", (done) => {
		request(app)
			.get("/users")
			.set("token", userToken)
			.set("key", userKey)
			.expect(401, done);
	});

	it("Get /users/1 equal 200 with auth user", (done) => {
		request(app)
			.get("/users/1")
			.set("token", userToken)
			.set("key", userKey)
			.expect(200, done);
	});
});

describe("HTTP Request post /users", () => {
	it("Post /users equal 200 with auth admin", (done) => {
		request(app)
			.post("/users")
			.send({
				username: "other user",
				isAdmin: false,
				email: "other.user@user.com",
				password: "asdf1234*",
			})
			.set("token", adminToken)
			.set("key", adminKey)
			.expect(200, done);
	});

	it("Post /users equal 401 with auth user", (done) => {
		request(app)
			.post("/users")
			.send({
				username: "other user",
				isAdmin: false,
				email: "other.user@user.com",
				password: "asdf1234*",
			})
			.set("token", userToken)
			.set("key", userKey)
			.expect(401, done);
	});
});

describe("HTTP Request Put /users", () => {
	it("Put /users equal 200 with auth admin", (done) => {
		request(app)
			.put("/users/1")
			.send({
				username: "other user",
				isAdmin: false,
				email: "other.user@user.com",
				password: "asdf1234*",
			})
			.set("token", adminToken)
			.set("key", adminKey)
			.expect(200, done);
	});

	it("Put /users equal 401 with auth user", (done) => {
		request(app)
			.put("/users/1")
			.send({
				username: "other user",
				isAdmin: false,
				email: "other.user@user.com",
				password: "asdf1234*",
			})
			.set("token", userToken)
			.set("key", userKey)
			.expect(401, done);
	});
});
describe("HTTP Request Delete /users", () => {
	it("delete /users equal 200 with auth admin", (done) => {
		request(app)
			.del("/users/1")
			.set("token", adminToken)
			.set("key", adminKey)
			.expect(200, done);
	});

	it("Delete /users equal 401 with auth user", (done) => {
		request(app)
			.del("/users/1")
			.set("token", userToken)
			.set("key", userKey)
			.expect(401, done);
	});
});
