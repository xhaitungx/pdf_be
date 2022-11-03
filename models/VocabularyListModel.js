const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const vocabularyListSchema = mongoose.Schema(
  {
    bookId: {
      type: mongoose.Schema.Types.ObjectId, ref: "Book"
    },
    bookName: String,
    list:[{
      text: String,
      meaning: String
    }]
  },
  { timestamps: true }
);

const VocabularyList = mongoose.model("VocabularyList", vocabularyListSchema);

module.exports = VocabularyList;
