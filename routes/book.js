const BookController = require("../controllers/BookController");
const router = require("express").Router();
const TempController = require("../controllers/TempController");

router.post("/reset", TempController.reset);
router.post("/", BookController.create);
router.post("/books-list", BookController.show);
router.post("/deleted-books-list", BookController.showDeleted);
router.post("/book-detail", BookController.detail);
router.patch("/", BookController.update);
router.patch("/restore", BookController.restore);
router.patch("/soft-deleting", BookController.softDelete);
router.patch("/hard-deleting", BookController.hardDelete);
router.delete("/delete-all", BookController.deleteAll);

module.exports = router;
