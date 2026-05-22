const bcrypt = require("bcryptjs");
const User = require("../models/User");

exports.showRegister = (req, res) => {
  res.render("auth/register");
};

exports.register = async (req, res) => {
  const { username, password } = req.body;
  const existujiciUzivatel = await User.findOne({ username });
  if (existujiciUzivatel) {
    return res.send("Uživatel už existuje");
  }
  const hesloHash = await bcrypt.hash(password, 10);
  await User.create({ username, password: hesloHash, role: "user" });
  res.redirect("/login");
};

exports.showLogin = (req, res) => {
  res.render("auth/login");
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const uzivatel = await User.findOne({ username });
  if (!uzivatel) {
    return res.send("Uživatel neexistuje");
  }
  const shoda = await bcrypt.compare(password, uzivatel.password);
  if (!shoda) {
    return res.send("Špatné heslo");
  }
  req.session.user = {
    id: uzivatel._id,
    username: uzivatel.username,
    role: uzivatel.role
  };
  res.redirect("/mysi");
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};
