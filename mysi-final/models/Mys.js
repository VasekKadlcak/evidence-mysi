const mongoose = require("mongoose");
const mysSchema = new mongoose.Schema({
  name: String,
  typ: String,
  age: Number,
  description: String,
  image: {
    type: String,
    default: ""
  }
}, { timestamps: true })
module.exports = mongoose.model("Mys", mysSchema);
