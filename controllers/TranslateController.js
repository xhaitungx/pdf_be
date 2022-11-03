const TranslateUtils = require("../utils/TranslateUtils");

module.exports = {
  translate: function (req, res) {
    const text = req.body.text.trim();
    console.log(text);
  TranslateUtils.sentenceTranslator(text, res);
  },
};
