const express = require("express");
const listController = require("../controller/listController");
const router = express.Router();

router.post("/create", listController.createList);
router.post("/move", listController.moveTask);

router.get("/:userId", listController.getListsByUser);

module.exports = router;
