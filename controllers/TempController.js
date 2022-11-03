const NoteList = require("../models/NoteListModel");
const User = require("../models/UserModel");
const VocabularyList = require("../models/VocabularyListModel");
const Book = require("../models/BookModel");
let { connect } = require("../config/db");

module.exports = {
  reset: function (req, res) {
    connect();
    NoteList.deleteMany({}).then(result => console.log(result));
    VocabularyList.deleteMany({}).then(result => console.log(result));
    User.deleteMany({}).then(result => console.log(result));
    Book.deleteMany({}).then(result => console.log(result));
    res.status(200).json({
        message:"done"
    })
  },
};
