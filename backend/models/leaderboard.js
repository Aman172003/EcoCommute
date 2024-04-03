const mongoose = require("mongoose");
const { Schema } = mongoose;

const LeaderboardSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  Sname: {
    type: String,
    required: true,
  },
  coins: {
    type: Number,
  },
  rank: {
    type: Number,
  },
});

const Leaderboard = mongoose.model("leaderboard", LeaderboardSchema);
module.exports = Leaderboard;
