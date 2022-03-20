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
      _id: {id: false},
      text: String
    }
  ],

  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ],

  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

TrailSchema.methods.isAuthor = function (user) {
  if (this.author._id.equals(user._id)) {
    return true;
  } else {
    return false;
  }
};

TrailSchema.methods.avgScore = function () {
  return 1;
}

const Trail = mongoose.model("Trail", TrailSchema);
module.exports = Trail;
