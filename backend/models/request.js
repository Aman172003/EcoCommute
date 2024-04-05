const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define schema for ride requests
const rideRequestSchema = new Schema({
  source: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  driverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "driver",
    required: true,
  },
  passengerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "passenger",
  },
  //   timestamp: {
  //     type: Date,
  //     default: Date.now
  //   }
});

// Create RideRequest model
const RideRequest = mongoose.model("RideRequest", rideRequestSchema);

module.exports = RideRequest;
