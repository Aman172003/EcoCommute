const mongoose = require("mongoose");
const { Schema } = mongoose;

const CampaignSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  supporters: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
});

const Campaign = mongoose.model("campaign", CampaignSchema);
module.exports = Campaign;
