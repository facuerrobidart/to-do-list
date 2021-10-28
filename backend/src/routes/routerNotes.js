const express = require("express");
const router = express.Router();
const controller = require("./../controllers/controllerNotes");
const bodyParser = require("body-parser");


router.get("/folders",controller.foldersAPI);
router.get("/folders/:folderId",controller.notesInFolderAPI);
router.post("/folders/:folderId",bodyParser.json(),controller.createNote);
router.post("/folders",bodyParser.json(),controller.createFolder);


module.exports = router;