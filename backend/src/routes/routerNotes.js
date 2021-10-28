const express = require("express");
const router = express.Router();
const controller = require("./../controllers/controllerNotes");
const bodyParser = require("body-parser");


router.get("/folders",controller.foldersAPI);
router.get("/folders/:folderId",controller.notesInFolderAPI);
router.post("/folders/:folderId",bodyParser.json(),controller.createNote);
router.put("/folders/status",bodyParser.json(),controller.changeStatus);
router.put("/folders/:folderId",bodyParser.json(),controller.updateNote);
router.post("/folders",bodyParser.json(),controller.createFolder);
router.delete("/folders",bodyParser.json(),controller.deleteFolder);
router.delete("/folders/:folderId",bodyParser.json(),controller.deleteNote);

module.exports = router;