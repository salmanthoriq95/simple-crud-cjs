// @ts-check
"use strict";

const { Router } = require("express");
const router = Router();

const usersRoutes = require("../controllers/users/_routes.users");

module.exports = {
	users: router.use("/users", usersRoutes),
};

