const mongoose = require("mongoose");
const { Schema } = mongoose;

const CampaignSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  supporters: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
    ref: "user",
  },
});

const Campaign = mongoose.model("campaign", CampaignSchema);
module.exports = Campaign;
