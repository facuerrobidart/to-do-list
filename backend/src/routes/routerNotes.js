const express = require("express");
const router = express.Router();
const controller = require("./../controllers/controllerNotes");


router.get("/folders",controller.foldersAPI);
router.get("/folders/:folderId",controller.notesInFolderAPI);


module.exports = router;