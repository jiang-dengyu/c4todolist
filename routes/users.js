const express = require("express");
const router = express.Router();

const db = require("../models");
const Users = db.Users;

/* 註冊 */
router.get("/register", (req, res) => {
  return res.render("register");
});
router.post("/register/create", (req, res, next) => {
  const { name, email, password, confirm_password } = req.body;

  return Users.create({
    name: name,
    email: email,
    password: password,
  })
    .then((user) => {
      res.flash("success", "註冊成功");
      res.redirect("/login");
    })
    .catch((error) => {
      error.errorMessage = "註冊失敗 :(";
      next(error);
    });
});
/* 登入 */
router.get("/login", (req, res) => {
  return res.render("login");
});

module.exports = router;
