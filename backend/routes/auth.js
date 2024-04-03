const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchUser");
const { body, validationResult } = require("express-validator");
const JWT_SECRET = process.env.JWT_SECRET;

// signup route: POST
router.post(
  "/signup",
  [
    body("email", "Enter a valid Email").isEmail(),
    // body("city", "Select a city").exists(),
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("password", "Enter a valid password").isLength({ min: 8 }),
  ],
  async (req, res) => {
    let success = false;
    // if there are error, return bad request and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    try {
      // check whether the user with this email exists already
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ success, error: "Email already exist!" });
      } else {
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
          name: req.body.name,
          // city: req.body.city,
          password: secPass,
          email: req.body.email,
        });
        const data = {
          user: {
            id: user.id,
            // name: user.name,
            // city: user.city
          },
        };
        success = true;
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({
          authToken,
          success,
          name: user.name,
          id: user.id,
          // city: user.city,
        });
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// login route: POST
router.post(
  "/login",
  [
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          success,
          error: "Please try to login with correct credentials!",
        });
      } else {
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
          return res.status(400).json({
            success,
            error: "Please try to login with correct credentials!",
          });
        }
        const data = {
          user: {
            id: user.id,
            // name: user.name,
          },
        };
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({
          authToken,
          success,
          name: user.name,
          id: user.id,
          // city: user.city,
        });
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

module.exports = router;
