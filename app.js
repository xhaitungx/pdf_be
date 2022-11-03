var express = require("express"),
  route = require("./routes"),
  cors = require("cors"),
  fileupload = require("express-fileupload");
bodyParser = require("body-parser");

app = express();
app.use(cors());
app.use(fileupload());
app.use(express.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ extended: true, parameterLimit: 100000 }));
require("dotenv").config();
route(app);

app.listen(process.env.PORT, () => {
  console.log("App running on port: " + process.env.PORT);
});
