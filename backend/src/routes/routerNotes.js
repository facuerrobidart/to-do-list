const express = require("express");
const router = express.Router();
const controller = require("./../controllers/controllerNotes");


router.get("/:userId/folders",controller.foldersAPI);
router.get("/:userId/folders/:folderId",controller.notesInFolderAPI);


module.exports = router;