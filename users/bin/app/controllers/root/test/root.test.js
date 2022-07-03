//@ts-check
"use strict";

const request = require("supertest");
const server = require("../../../index");
const dotenv = require("dotenv");
const path = require("path");
const app = require("express")();

jest.mock("../../../models/mysql/queries/news.queries", () =>
  require("../../../models/mysql/mock/news.mock")
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

describe("HTTP Request get /", () => {
  it("Get / 200", (done) => {
    request(app).get("/").expect(200, done);
  });
  it("Get / 400", (done) => {
    request(app).get("/asd").expect(400, done);
  });
});
