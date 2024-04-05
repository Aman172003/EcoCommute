const express = require("express");
const router = express.Router();
const Driver = require("../models/driver");

// Fetch available drivers based on source and destination
router.get("/availabledrivers", async (req, res) => {
  const { source, destination } = req.body;
  try {
    // Find drivers with matching source and destination
    const availableDrivers = await Driver.find({ source, destination });
    res.json(availableDrivers);
  } catch (error) {
    console.error("Error fetching available drivers:", error);
    res.status(500).json({ error: "Server Error" });
  }
});

// Handle ride request from passenger
router.post("/askride/:driverId", async (req, res) => {
  const { source, destination } = req.body;
  const driverId = req.params.driverId;
  try {
    // Handle the ride request logic (e.g., save the request in the database, notify the driver)
    // This is just a placeholder
    res.json({ message: "Ride request sent successfully" });
  } catch (error) {
    console.error("Error requesting ride:", error);
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
