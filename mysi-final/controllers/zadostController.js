const ZadostOPrevzeti = require("../models/ZadostOPrevzeti");
const Mys = require("../models/Mys");

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

const muzeRozhodovat = async (user, zadostId) => {
  if (user.role === "admin") return true;
  const zadost = await ZadostOPrevzeti.findById(zadostId).populate("mys");
  return zadost?.mys?.autor?.toString() === user.id;
};

exports.schvalitZadost = async (req, res) => {
  const user = req.session.user;
  if (!await muzeRozhodovat(user, req.params.id)) {
    return res.status(403).send("Nemáš oprávnění rozhodovat o této žádosti.");
  }
  await ZadostOPrevzeti.findByIdAndUpdate(req.params.id, { stav: "schvalena" });
  res.redirect("/zadosti");
};

exports.zamitnoutZadost = async (req, res) => {
  const user = req.session.user;
  if (!await muzeRozhodovat(user, req.params.id)) {
    return res.status(403).send("Nemáš oprávnění rozhodovat o této žádosti.");
  }
  await ZadostOPrevzeti.findByIdAndUpdate(req.params.id, { stav: "zamitnuta" });
  res.redirect("/zadosti");
};
