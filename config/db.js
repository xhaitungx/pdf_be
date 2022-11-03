const mongoose = require("mongoose");
require("dotenv/config");

async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connect successfully!!");
  } catch (ex) {
    console.log("Connect failue!!");
  }
}

module.exports = { connect };
