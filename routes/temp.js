const TempController = require("../controllers/TempController");
const router = require("express").Router();

router.post("/",TempController.reset);

module.exports = router;