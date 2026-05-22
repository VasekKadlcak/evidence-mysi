const ZadostOPrevzeti = require("../models/ZadostOPrevzeti");

exports.vytvorZadost = async (req, res) => {
  const { jmenoZadatele, email, zprava } = req.body;
  await ZadostOPrevzeti.create({
    mys: req.params.mysId,
    jmenoZadatele,
    email,
    zprava
  });
  res.redirect("/mysi");
};

exports.vsechnyZadosti = async (req, res) => {
  const zadosti = await ZadostOPrevzeti.find()
    .populate("mys")
    .sort({ createdAt: -1 });
  res.render("zadosti/index", { zadosti });
};

exports.schvalitZadost = async (req, res) => {
  await ZadostOPrevzeti.findByIdAndUpdate(req.params.id, { stav: "schvalena" });
  res.redirect("/zadosti");
};

exports.zamitnoutZadost = async (req, res) => {
  await ZadostOPrevzeti.findByIdAndUpdate(req.params.id, { stav: "zamitnuta" });
  res.redirect("/zadosti");
};
