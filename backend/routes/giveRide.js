const express = require("express");
const fetchuser = require("../middleware/fetchUser");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Driver = require("../models/driver");

// Route to create a new driver
router.post(
  "",
  fetchuser,
  [
    body("Dname", "Enter a valid text").isLength({ min: 3 }),
    body("seats", "At least 1 seat should be there").isInt({ min: 1 }),
    body("source", "Source is required").notEmpty(),
    body("destination", "Destination is required").notEmpty(),
    body("location", "Location is required").isObject().notEmpty(),
  ],
  async (req, res) => {
    try {
      const { Dname, vehicle, seats, source, destination, fuel, location } =
        req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const newDriver = new Driver({
        Dname,
        vehicle,
        seats,
        source,
        destination,
        fuel,
        location,
      });

      const savedDriver = await newDriver.save();

      res.status(201).json(savedDriver);
    } catch (error) {
      console.error("Error creating new driver:", error);
      res.status(500).json({ message: "Server Error" });
    }
  }
);

// Route to get driver location by driver ID
router.get("/location/:id", fetchuser, async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id);
    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }
    const location = driver.location; // Get driver's location
    res.json({ location });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Route to get driver details by driver ID
router.get("/details/:id", fetchuser, async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id);
    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }
    // Return driver details
    res.json(driver);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// delete the driver when he gets out of the page
router.delete("/:id", fetchuser, async (req, res) => {
  try {
    const deletedDriver = await Driver.findOneAndDelete(req.params.id);
    if (!deletedDriver) {
      return res.status(404).json({ message: "Driver not found" });
    }
    res.json({ message: "Driver deleted successfully" });
  } catch (error) {
    console.error("Error deleting driver:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
