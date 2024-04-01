const express = require("express");
const fetchuser = require("../middleware/fetchUser");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Passenger = require("../models/passenger");

// Route to create passenger
router.post(
  "",
  fetchuser,
  [
    body("Pname", "Enter a valid text").isLength({ min: 3 }),
    body("source", "Source is required").notEmpty(),
    body("destination", "Destination is required").notEmpty(),
    body("location", "Location is required").isObject().notEmpty(),
  ],
  async (req, res) => {
    try {
      const { source, destination, location } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const newPassenger = new Passenger({
        Pname,
        source,
        destination,
        location,
      });

      const savedPassenger = await newPassenger.save();

      res.status(201).json(savedPassenger);
    } catch (error) {
      console.error("Error creating new Passenger:", error);
      res.status(500).json({ message: "Server Error" });
    }
  }
);

// delete the Passenger when he gets out of the page
router.delete("/:id", fetchuser, async (req, res) => {
  try {
    const deletedPassenger = await Passenger.findOneAndDelete(req.params.id);
    if (!deletedPassenger) {
      return res.status(404).json({ message: "Passenger not found" });
    }
    res.json({ message: "Passenger deleted successfully" });
  } catch (error) {
    console.error("Error deleting Passenger:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// route to get location of passenger

// route to get details of the passenger

// route to make request to the driver

module.exports = router;
