// @ts-check
"use strict";

const { Router } = require("express");
const router = Router();

const controllers = require("./controllers");

router.get("/:id?", controllers.getController);
router.post("/", controllers.postController);
router.put("/:id", controllers.putController);
router.delete("/:id", controllers.deleteController);

module.exports = router;
