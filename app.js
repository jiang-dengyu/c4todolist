const express = require("express");
const app = express();
const port = 3000;

if (process.env.NODE_ENV === "development") {
  require("dotenv").config();
}
console.log(process.env.NODE_ENV, process.env.SESSION_SECRET); //每次重開時的環境變數與session確認

const router = require("./routes");

const { engine } = require("express-handlebars");
app.engine("hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./views");

app.use(express.urlencoded({ extended: true }));

const methodOverride = require("method-override");
app.use(methodOverride("_method"));

const flash = require("connect-flash");
const session = require("express-session");
const messageHandler = require("./middlewares/message-handler");
const errorHandler = require("./middlewares/error-handler");

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    /*secret: "ThisIsSecret",*/
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());
app.use(messageHandler);
app.use(router);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`);
});
