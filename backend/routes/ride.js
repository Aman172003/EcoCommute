const express = require("express");
const router = express.Router();
const Driver = require("../models/driver");
const RideRequest = require("../models/request");
const fetchUser = require("../middleware/fetchUser");
const Passenger = require("../models/passenger");

// // Fetch available drivers based on source and destination
// router.get("/availabledrivers", async (req, res) => {
//   const { source, destination } = req.body;
//   try {
//     // Create a new passenger instance
//     const newPassenger = new Passenger({ source, destination });
//     // Save the new passenger instance to the database
//     await newPassenger.save();

//     // Find drivers with matching source and destination
//     const availableDrivers = await Driver.find({ source, destination });

//     // Send response including both available drivers and the new passenger
//     res.json({ availableDrivers, newPassenger });
//   } catch (error) {
//     console.error("Error fetching available drivers:", error);
//     res.status(500).json({ error: "Server Error" });
//   }
// });

// Route to fetch available drivers based on source and destination
router.get("/availabledrivers", async (req, res) => {
  const { source, destination } = req.query; // Extract source and destination from query parameters

  try {
    // Create a new passenger instance
    const newPassenger = new Passenger({ source, destination });
    // Save the new passenger instance to the database
    await newPassenger.save();
    // Query the database for drivers with matching source and destination
    const availableDrivers = await Driver.find({ source, destination });

    // Send the list of available drivers as a JSON response
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

    // Send a success response with the newly created ride request and all requests to the driver
    res.status(201).json({
      message: "Ride request sent successfully",
      rideRequest: newRideRequest,
    });
  } catch (error) {
    console.error("Error sending ride request:", error);
    // Send an error response
    res.status(500).json({ error: "Server Error" });
  }
});

// Handle ride offer from driver
router.post("/giveride", async (req, res) => {
  const { vehicle, seats, source, destination } = req.body;
  try {
    // Create a new instance of Driver model with provided details
    const newDriver = new Driver({ vehicle, seats, source, destination });
    // Save the new driver instance to the database
    await newDriver.save();
    // Return the driver ID along with the success message
    res
      .status(201)
      .json({ message: "Ride offered successfully", driverId: newDriver._id });
  } catch (error) {
    console.error("Error offering ride:", error);
    res.status(500).json({ error: "Server Error" });
  }
});

// Fetch ride requests for a specific driver
router.get("/riderequests/:driverId", async (req, res) => {
  const driverId = req.params.driverId;
  try {
    const rideRequests = await RideRequest.find({ driverId });
    res.json({ rideRequests });
  } catch (error) {
    console.error("Error fetching ride requests:", error);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
