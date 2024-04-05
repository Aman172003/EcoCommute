const express = require("express");
const router = express.Router();
const Driver = require("../models/driver");
const RideRequest = require("../models//request");
const fetchUser = require("../middleware/fetchUser");
const Passenger = require("../models/passenger");

// Fetch available drivers based on source and destination
router.get("/availabledrivers", async (req, res) => {
  const { source, destination } = req.body;
  try {
    // Create a new passenger instance
    const newPassenger = new Passenger({ source, destination });
    // Save the new passenger instance to the database
    await newPassenger.save();

    // Find drivers with matching source and destination
    const availableDrivers = await Driver.find({ source, destination });

    // Send response including both available drivers and the new passenger
    res.json({ availableDrivers, newPassenger });
  } catch (error) {
    console.error("Error fetching available drivers:", error);
    res.status(500).json({ error: "Server Error" });
  }
});

// Handle ride request from passenger
router.post("/askride/:driverId", async (req, res) => {
  const { source, destination, passengerId } = req.body;
  const driverId = req.params.driverId;
  try {
    // Create a new ride request instance
    const newRideRequest = new RideRequest({
      source,
      destination,
      driverId,
      passengerId,
    });

    // Save the ride request to the database
    await newRideRequest.save();

    // Fetch all ride requests made to this driver
    const allRequestsToDriver = await RideRequest.find({ driverId });

    // Send a success response with the newly created ride request and all requests to the driver
    res.status(201).json({
      message: "Ride request sent successfully",
      rideRequest: newRideRequest,
      allRequestsToDriver,
    });
  } catch (error) {
    console.error("Error sending ride request:", error);
    // Send an error response
    res.status(500).json({ error: "Server Error" });
  }
});

// In api.js or routes.js

// Handle ride offer from driver
router.post("/giveride", async (req, res) => {
  const { vehicle, seats, source, destination } = req.body;
  try {
    // Create a new instance of Driver model with provided details
    const newDriver = new Driver({ vehicle, seats, source, destination });
    // Save the new driver instance to the database
    await newDriver.save();
    res.status(201).json({ message: "Ride offered successfully" });
  } catch (error) {
    console.error("Error offering ride:", error);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
