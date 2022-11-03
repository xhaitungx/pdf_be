const router = require("express").Router();
const TranslateController = require("../controllers/TranslateController");
router.post("/", TranslateController.translate);
module.exports = router;
