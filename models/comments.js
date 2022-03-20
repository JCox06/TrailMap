const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: true
  },
  text: {
    type: String
  },

  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;