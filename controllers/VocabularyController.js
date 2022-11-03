const Vocabulary = require("../models/VocabularyListModel");
const User = require("../models/UserModel");
let { connect } = require("../config/db");

module.exports = {
  show: function (req, res) {
    connect();
    const { userId } = req.body;
    User.findById(userId).select("vocabularies -_id").populate("vocabularies").then((result)=>res.status(200).json(result));
  },
  create: function (req, res) {
    connect();
    const { bookId, payload } = req.body;
    Vocabulary.findOneAndUpdate(
      { bookId: bookId },
      {
        $push: {
          list: payload,
        },
      }
    ).then((result) => console.log(result));
  },
  update: function (Req, res) {},
  delete: function (req, res) {},
};
