// @ts-check
"use strict";

const { Router } = require("express");
const router = Router();

const controllers = require("./controllers");

router.delete("/", controllers.logoutController);

module.exports = router;
