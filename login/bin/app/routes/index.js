// @ts-check
"use strict";

const { Router } = require("express");
const router = Router();

const loginRoutes = require("../controllers/login/_routes.login");
const logoutRoutes = require("../controllers/logout/_routes.login");
const sessionRoutes = require("../controllers/session/_routes.session");

module.exports = {
	login: router.use("/login", loginRoutes),
	logout: router.use("/logout", logoutRoutes),
	session: router.use("/session", sessionRoutes),
};
