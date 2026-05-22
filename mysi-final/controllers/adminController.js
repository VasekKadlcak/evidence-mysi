const User = require("../models/User");
exports.getUsers = async (req, res) => {
 const users = await User.find().sort({ username: 1 });
 res.render("admin/users", { users });
};
exports.changeRole = async (req, res) => {
 const { role } = req.body;
 await User.findByIdAndUpdate(req.params.id, { role });
 res.redirect("/admin/users");
};
