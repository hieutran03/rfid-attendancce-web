const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/waitingList.controller");
router.get("/",controller.index);
router.delete("/delete/:id",controller.deleteItem);
router.get("/create/:id", controller.create);
router.post("/create", controller.createPost);
module.exports = router;