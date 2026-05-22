const Mys = require("../models/Mys");

exports.vsechnyMysi = async (req, res) => {
  const mysi = await Mys.find().sort({ createdAt: -1 });
  res.render("mysi/index", { mysi });
};

exports.detailMysi = async (req, res) => {
  const mys = await Mys.findById(req.params.id);
  res.render("mysi/show", { mys });
};

exports.zobrazitFormularPridani = (req, res) => {
  res.render("mysi/create");
};

exports.pridatMys = async (req, res) => {
  const { name, breed, age, description } = req.body;
  let image = "";
  if (req.file) {
    image = req.file.filename;
  }
  await Mys.create({ name, breed, age, description, image });
  res.redirect("/mysi");
};

exports.zobrazitFormularUpravy = async (req, res) => {
  const mys = await Mys.findById(req.params.id);
  res.render("mysi/edit", { mys });
};

exports.upravitMys = async (req, res) => {
  const { name, breed, age, description } = req.body;
  const data = { name, breed, age, description };
  if (req.file) {
    data.image = req.file.filename;
  }
  await Mys.findByIdAndUpdate(req.params.id, data);
  res.redirect(`/mysi/${req.params.id}`);
};

exports.smazatMys = async (req, res) => {
  await Mys.findByIdAndDelete(req.params.id);
  res.redirect("/mysi");
};
