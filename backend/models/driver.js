const mongoose = require("mongoose");
const { Schema } = mongoose;

const DriverSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  passenger: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "passenger",
  },
  requests: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "request",
  },

  // Dname: {
  //   type: String,
  //   required: true,
  // },
  vehicle: {
    type: String,
    required: true,
  },
  seats: {
    type: Number,
    required: true,
  },
  source: {
    // type: {
    type: String,
    // enum: ["Point"],
    required: true,
    // },
    // coordinates: {
    //   type: [Number],
    //   required: true,
    // },
  },
  destination: {
    // type: {
    type: String,
    // enum: ["Point"],
    required: true,
    // },
    // coordinates: {
    //   type: [Number],
    //   required: true,
    // },
  },
  // fuel: {
  //   type: String,
  //   required: true,
  // },
  // location: {
  //   type: {
  //     type: String,
  //     // enum: ["Point"],
  //     required: true,
  //   },
  // coordinates: {
  //   type: [Number],
  //   required: true,
  // },
  // },
});

// DriverSchema.index({ location: "2dsphere" });

const Driver = mongoose.model("Driver", DriverSchema);
module.exports = Driver;
