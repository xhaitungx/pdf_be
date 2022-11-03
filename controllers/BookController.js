const Book = require("../models/BookModel");
const BookUtils = require("../utils/BookUtils");
const { connect } = require("../config/db");
const User = require("../models/UserModel");
const { response } = require("express");
module.exports = {
  show: async function (req, res) {
    connect();
    const { userId } = req.body;
    const books = await User.findById(userId) 
      .select("books -_id")
      .populate({
        path: "books",
        select: "-content",
        match: {
          softDelete: false,
        },
      });
    res.status(200).json(books);
  },
  showDeleted: async function (req, res) {
    connect();
    const { userId } = req.body;
    const books = await User.findById(userId)
      .select("books -_id")
      .populate({
        path: "books",
        select: "-content",
        match: {
          softDelete: true,
        },
      });
    res.status(200).json(books);
  },
  detail: async function (req, res) {
    connect();
    const { userId, bookId } = req.body;
    const result = await User.findById(userId)
      .select("books -_id")
      .populate({
        path: "books",
        select: "content name md5",
        match: {
          _id: bookId,
        },
      });
    if (result) res.status(200).json(result);
  },
  create: async function (req, res) {
    connect();
    const { userId } = req.body;
    const books = await BookUtils.isNotRepeat(
      userId,
      req.files.files,
      req.files.length
    );
    BookUtils.createBook(userId, books, res);
  },
  delete: function (req, res) {
    connect();
    const { id } = req.params;
    Book.findByIdAndDelete(id)
      .then((result) => {
        console.log(result);
        res.status(200).json({
          message: "Xóa sách thành công",
        });
      })
      .catch((err) =>
        res.status(404).json({
          message: "Xóa sách thất bại",
        })
      );
  },
  hardDelete: function (req, res) {
    connect();
    const { userId, bookId } = req.body;
    Book.findByIdAndDelete(bookId)
      .then((result) => User.updateOne({
        _id: userId
      },{
        $pull: {
          books: {
            _id: bookId
          }
        }}).then((result) => res.status(200).json({
          message:"Xóa sách thành công"
        })))
      .catch((err) =>
        res.status(404).json({
          message: "Xóa sách thất bại",
        })
      );
  },
  deleteAll: function (req, res) {
    connect();
    Book.deleteMany({})
      .then((result) =>
        res.status(200).json({
          message: "Xóa tất cả sách thành công",
        })
      )
      .catch((err) =>
        res.status(404).json({
          message: "Xóa tất cả sách thất bại",
        })
      );
  },
  update: function (req, res) {
    connect();
    const { bookId, payload } = req.body;
    console.log(bookId);
    Book.findByIdAndUpdate(bookId, payload)
      .then((result) => res.status(200).json({Message: "Đã cập nhật thành công"}))
      .catch((err) =>
        res.status(404).json({
          message: "Lỗi hệ thống",
        })
      );
  },
  softDelete: function (req, res) {
    connect();
    const { bookId } = req.body;
    console.log(bookId);
    Book.findByIdAndUpdate(bookId, {
      softDelete: true,
    })
      .then((result) =>
        res.status(200).json({
          message: "Sách đã được chuyển vào thùng rác",
        })
      )
      .catch((err) =>
        res.status(404).json({
          message: "Lỗi hệ thống",
        })
      );
  },
  restore: function (req, res) {
    connect();
    const { bookId } = req.body;
    Book.findByIdAndUpdate(bookId, {
      softDelete: false,
    })
      .then((result) =>
        res.status(200).json({
          message: "Sách đã được dời khỏi thùng rác",
        })
      )
      .catch((err) =>
        res.status(404).json({
          message: "Lỗi hệ thống",
        })
      );
  },
  softDeleteAll: function (req, res) {
    connect();
    const { id } = req.params;
    Book.findByIdAndDelete(id)
      .then((result) =>
        res.status(200).json({
          message: "Xóa sách thành công",
        })
      )
      .catch((err) =>
        res.status(404).json({
          message: "Xóa sách thất bại",
        })
      );
  },
};
