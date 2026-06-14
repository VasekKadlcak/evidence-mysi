const Mys = require("../models/Mys");
const fs = require("fs");

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
  const { name, typ, kategorie, description } = req.body;
  let image = "";
  if (req.file) {
    const fileData = fs.readFileSync(req.file.path);
    const base64 = fileData.toString("base64");
    const mime = req.file.mimetype;
    image = `data:${mime};base64,${base64}`;
    fs.unlinkSync(req.file.path); // smaž dočasný soubor
  }
  await Mys.create({ name, typ, kategorie, description, image, autor: req.session.user?.id });
  res.redirect("/mysi");
};

exports.zobrazitFormularUpravy = async (req, res) => {
  const mys = await Mys.findById(req.params.id);
  res.render("mysi/edit", { mys });
};

exports.upravitMys = async (req, res) => {
  const { name, typ, kategorie, description } = req.body;
  const data = { name, typ, kategorie, description };
  if (req.file) {
    const fileData = fs.readFileSync(req.file.path);
    const base64 = fileData.toString("base64");
    const mime = req.file.mimetype;
    data.image = `data:${mime};base64,${base64}`;
    fs.unlinkSync(req.file.path);
  }
  await Mys.findByIdAndUpdate(req.params.id, data);
  res.redirect(`/mysi/${req.params.id}`);
};

exports.smazatMys = async (req, res) => {
  await Mys.findByIdAndDelete(req.params.id);
  res.redirect("/mysi");
};
