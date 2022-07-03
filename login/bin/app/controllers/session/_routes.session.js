// @ts-check
"use strict";

const { Router } = require("express");
const router = Router();

const controllers = require("./controllers");

router.get("/", controllers.sessionController);

module.exports = router;
