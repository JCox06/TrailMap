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
  ],

  steps: [
    {
      text: String
    }
  ],

  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});

const Trail = mongoose.model("Trail", TrailSchema);
module.exports = Trail;
