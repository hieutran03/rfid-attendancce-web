const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/dashboard.controller");
router.get("/", controller.index);
router.get("/api", controller.api);

module.exports = router;