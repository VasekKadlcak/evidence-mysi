const mongoose = require("mongoose");
const zadostSchema = new mongoose.Schema({
  mys: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Mys"
  },
  jmenoZadatele: String,
  email: String,
  zprava: String,
  stav: {
    type: String,
    default: "cekajici"
  }
}, { timestamps: true });
module.exports = mongoose.model("ZadostOPrevzeti", zadostSchema);
