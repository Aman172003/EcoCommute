const mongoose = require("mongoose");
const { Schema } = mongoose;

const CommentSchema = Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
});

const Comment = mongoose.model("comment", CommentSchema);
module.exports = Comment;
