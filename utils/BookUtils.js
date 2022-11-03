const pdfjsLib = require("pdfjs-dist/legacy/build/pdf");
const Book = require("../models/BookModel");
const User = require("../models/UserModel");
const VocabularyList = require("../models/VocabularyListModel");
const NoteList = require("../models/NoteListModel");
const { createCanvas } = require("canvas");

module.exports = {
  isNotRepeat: async function (userId, files, length) {
    let arrayFiles = [];
    let books = {
      validBook: [],
      repeatedBook: [],
    };
    if (files.length === undefined) arrayFiles.push(files);
    else arrayFiles = files;
    for (let i = 0; i < arrayFiles.length; i++) {
      const isRepeat = await User.findById(userId)
        .select("books -_id")
        .populate({
          path: "books",
          match: {
            md5: arrayFiles[i].md5,
          },
        });
      if (isRepeat.books.length !== 0) books.repeatedBook.push(arrayFiles[i]);
      else books.validBook.push(arrayFiles[i]);
    }
    return books;
  },
  createBook: async function (userId, files, res) {
    const formattedBooks = files.validBook.map(
      async ({ name, data: content, md5 }) =>
        Object({
          name,
          content,
          md5,
          cover: await this.getPDFCover(content).then((result) =>
            result.toString()
          ),
        })
    );
    Book.create(await Promise.all(formattedBooks)).then(async (result) => {
      const booksId = result.map((book) => book._id);
      const vocabularyListId = result.map( async (book) =>
        await VocabularyList.create({
          bookId: book._id,
          bookName: book.name
        }).then((result) => result._id)
      );
      const noteListId = result.map( async (book) =>
        await NoteList.create({
          bookId: book._id,
          bookName: book.name
        }).then((result) => result._id)
      );

      const vocabularyListIdResponse = await Promise.all(vocabularyListId);
      const noteListIdResponse = await Promise.all(noteListId);
      User.findByIdAndUpdate(userId, {
        $push: {
          books: booksId,
          notes: noteListIdResponse,
          vocabularies: vocabularyListIdResponse,
        },
      }).then((result) => console.log(result));
      res.status(200).json({
        success: result.map((book) => book.name),
        fail: files.repeatedBook.map((book) => book.name),
      });
    });
  },
  getPDFCover: async function (file) {
    return new Promise((resolve, reject) => {
      pdfjsLib
        .getDocument({ data: file })
        .promise.then((pdfDoc) => {
          pdfDoc.getPage(1).then((page) => {
            var scale = 1.5;
            var viewport = page.getViewport({
              scale: scale,
            });
            const canvas = createCanvas(300, 200);
            var context = canvas.getContext("2d");
            canvas.height =
              viewport.height ||
              viewport.viewBox[3]; /* viewport.height is NaN */
            canvas.width =
              viewport.width ||
              viewport.viewBox[2]; /* viewport.width is also NaN */
            var task = page.render({
              canvasContext: context,
              viewport: viewport,
            });
            task.promise.then(async () => {
              let cover = canvas.toDataURL("image/jpeg").toString();
              resolve(cover);
            });
          });
        })
        .catch((err) => {
          resolve("");
        });
    });
  },
};
