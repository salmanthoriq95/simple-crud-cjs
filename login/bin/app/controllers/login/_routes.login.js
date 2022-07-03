// @ts-check
"use strict";

const { Router } = require("express");
const router = Router();

const controllers = require("./controllers");

router.post("/", controllers.loginController);

module.exports = router;
