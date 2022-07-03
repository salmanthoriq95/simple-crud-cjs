// @ts-check
"use strict";

const { Router } = require("express");
const router = Router();

const root = require("../controllers/root/_routes.root");

module.exports = {
	template: router.use("/", root),
};
