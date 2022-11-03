const sentenceTranslator = require("@vitalets/google-translate-api");
const translate = require("tratu-core");

module.exports = {
  wordTranslator: async function (word, res) {
    await translate(word)
      .then((result) => {
        res.status(200).json({ result: result.trim().split(`\n`) });
      })
      .catch((error) => {
        res
          .status(500)
          .json({ errorMessage: "Hệ thống không ổn định, hãy thử lại sau" });
      });
  },
  sentenceTranslator: async function (sentence, res) {
    await sentenceTranslator(sentence, { from: "en", to: "vi" })
      .then((result) => {
        res.status(200).json({ result: result.text });
      })
      .catch((error) => {
        res
          .status(500)
          .json({ errorMessage: "Hệ thống không ổn định, hãy thử lại sau" });
      });
  },
};
