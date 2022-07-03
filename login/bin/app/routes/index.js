// @ts-check
"use strict";

const { Router } = require("express");
const router = Router();

const loginRoutes = require("../controllers/login/_routes.login");
const logoutRoutes = require("../controllers/logout/_routes.login");

module.exports = {
	login: router.use("/login", loginRoutes),
	logout: router.use("/logout", logoutRoutes),
};

