const express = require("express");
const router = express.Router();

const todos = require("./todos");
const users = require("./users");
router.use("/todos", todos);
router.use("/users", users);

/* 根目錄 */
router.get("/", (req, res) => {
  res.render("index");
});
/* 註冊目錄 */
router.get("/register", (req, res) => {
  return res.render("register");
});
/* 登入目錄 */
router.get("/login", (req, res) => {
  return res.render("login");
});

router.post("/login", (req, res) => {
  return res.send(req.body);
});

router.post("/logout", (req, res) => {
  return res.send("logout");
});

module.exports = router;
