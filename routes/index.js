function route(app) {
  app.use("/book", require("./book"));
  app.use("/translator", require("./translate"));
  app.use("/user",require("./user"));
  app.use("/vocabulary",require("./vocabulary"));
  app.use("/note",require("./note"))
  app.use("/reset",require("./temp"))
}

module.exports = route;
