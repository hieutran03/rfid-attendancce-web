const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/employee.controller");
router.get("/", controller.index);
router.get("/create", controller.create);
router.post("/create", controller.createPost);
router.delete("/delete/:id", controller.deleteEmployee);
router.get("/edit/:id", controller.editEmployee);
router.patch("/edit/:id",controller.editEmployeePatch);
module.exports = router;