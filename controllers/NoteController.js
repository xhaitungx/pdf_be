const NoteList = require("../models/NoteListModel");
const Book = require("../models/BookModel");
const User = require("../models/UserModel");

let { connect } = require("../config/db");

module.exports = {
  show: function (req, res) {
    connect();
    const {userId} = req.body;
    console.log(userId);
    User.findById(userId).select("notes -_id").populate("notes").then((result)=> res.status(200).json(result));
  },
  create: function (req, res) {
    connect();
    const {bookId, payload} = req.body;
    console.log(bookId);
    console.log(payload.notes);
    NoteList.findOneAndUpdate(
      { bookId: bookId },
      {
        $push: {
          list: payload.notes,
        },
      }
    ).then((result) => res.status(200).json({
      message:"Add thành công"
    }));
  },
  detail: function (req, res) {
    connect();
    const {bookId} = req.body;
    console.log(bookId);
    NoteList.findOne({bookId}).then((result)=> res.status(200).json(result));
  },
  delete: function (req, res) {},
};
