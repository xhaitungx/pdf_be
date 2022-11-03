const mongoose = require("mongoose");

const NoteListSchema = mongoose.Schema(
  {
    bookId: {
      type: mongoose.Schema.Types.ObjectId, ref: "Book"
    },
    bookName: String,
    list:[{
      note: String,
      text: String,
      color: String,
      cfi: String,
      range: String,
    }]
  },
  { timestamps: true }
);

const NoteList = mongoose.model("NoteList", NoteListSchema);
module.exports = NoteList;
