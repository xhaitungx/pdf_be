const NoteController = require("../controllers/NoteController");
const router = require("express").Router();

router.post("/", NoteController.create);
router.post("/book-notes", NoteController.detail);
router.post("/notes-list", NoteController.show);

module.exports = router;
