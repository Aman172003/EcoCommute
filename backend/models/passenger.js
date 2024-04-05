const mongoose = require("mongoose");
const { Schema } = mongoose;

const PassengerSchema = new Schema({
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "user",
  // },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "driver",
  },
  // Pname: {
  //   type: String,
  //   required: true,
  // },
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
  // location: {
  // type: {
  // type: String,
  // enum: ["Point"],
  // required: true,
  // },
  // coordinates: {
  //   type: [Number],
  //   required: true,
  // },
  // },
});

const Passenger = mongoose.model("passenger", PassengerSchema);
module.exports = Passenger;
