const mongoose = require("mongoose");
const mysSchema = new mongoose.Schema({
  name: String,
  typ: String,
  kategorie: { type: String, required: true },
  description: String,
  image: {
    type: String,
    default: ""
  }
}, { timestamps: true })
module.exports = mongoose.model("Mys", mysSchema);
