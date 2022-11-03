const mongoose = require("mongoose");

const bookSchema = mongoose.Schema(
  {
    softDelete: { type: Boolean, default: false },
    name: String,
    cover: String,
    md5: String,
    content: Buffer,
    cfi: Object,
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
