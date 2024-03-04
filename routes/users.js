const express = require("express");
const router = express.Router();

const db = require("../models");
const Users = db.Users;

/* 註冊驗證邏輯*/
router.post("/register/create", (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;

  if (!email || !password) {
    req.flash("error", "email 及 password 為必填");
    return res.redirect("back");
  }
  if (password !== confirmPassword) {
    req.flash("error", "password 及confirmPassword需一致");
    return res.redirect("back");
  }
  return Users.count({ where: { email: email } })
    .then((rowCount) => {
      if (rowCount > 0) {
        req.flash("error", "email 已經被註冊");
        return;
      }

      return Users.create({ email: email, name: name, password: password });
    })
    .then((user) => {
      if (!user) {
        return res.redirect("back");
      }

      req.flash("success", "註冊成功");
      return res.redirect("/login");
    })
    .catch((error) => {
      error.errorMessage = "註冊失敗";
      next(error);
    });
});
/* 登入 */
router.get("/login", (req, res) => {
  return res.render("login");
});

module.exports = router;
