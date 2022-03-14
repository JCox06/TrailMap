const mongoose = require("mongoose");

const TrailSchema = new mongoose.Schema({
  title: String,
  description: String,
  difficulty: String,
  location: String,
  threeW: String,

  imagePreviews: [
    {
      source: String,
      description: String
    }
  ]
});

const Trail = mongoose.model("Trail", TrailSchema);
module.exports = Trail;
