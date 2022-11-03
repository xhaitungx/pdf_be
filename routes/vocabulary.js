const VocabularyController = require("../controllers/VocabularyController");
const router = require("express").Router();

router.post("/", VocabularyController.create);
router.post("/vocabulary-list", VocabularyController.show);


module.exports = router;
