const express = require("express");
const router = express.Router();
const controller = require("./../controllers/controllerUser");
const bodyParser = require("body-parser")

router.post("/login",bodyParser.json(),controller.logueo);

module.exports = router;