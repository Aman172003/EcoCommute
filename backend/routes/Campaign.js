const express = require("express");
const fetchuser = require("../middleware/fetchUser");
const router = express.Router();
const Campaign = require("../models/campaign");
const { body, validationResult } = require("express-validator");

// get all Campaigns: get
router.get("/fetchallcampaigns", async (req, res) => {
  try {
    const campaigns = await Campaign.find({});
    res.json(campaigns);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// add a campaign: post
router.post(
  "/addcampaign",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 5 }),
    body("description", "Description must be atleast 10 characters").isLength({
      min: 10,
    }),
    body("address", "Description must be atleast 10 characters").isLength({
      min: 10,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, date, address } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const campaign = new Campaign({
        title,
        description,
        date,
        address,
        user: req.user.id,
      });
      const savedCampaign = await campaign.save();
      res.json(savedCampaign);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE 3: Update an existing campaign
router.put("/updatecampaign/:id", fetchuser, async (req, res) => {
  const { title, description, date, address } = req.body;
  try {
    const newCampaign = {};
    if (title) {
      newCampaign.title = title;
    }
    if (description) {
      newCampaign.description = description;
    }
    if (date) {
      newCampaign.date = date;
    }
    if (address) {
      newCampaign.address = address;
    }
    let campaign = await Campaign.findById(req.params.id);
    if (!campaign) {
      return res.status(404).send("NOT FOUND");
    }
    if (campaign.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    campaign = await Campaign.findByIdAndUpdate(
      req.params.id,
      { $set: newCampaign },
      { new: true }
    );
    res.json({ campaign });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 4: Delete an existing Campaign
router.delete("/deletecampaign/:id", fetchuser, async (req, res) => {
  try {
    let campaign = await Campaign.findById(req.params.id);
    if (!campaign) {
      return res.status(404).send("NOT FOUND");
    }
    if (campaign.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    campaign = await Campaign.findByIdAndDelete(req.params.id);
    res.json({ Success: "Campaign has been deleted", campaign: campaign });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// update: add and remove the supporter
router.put("/addsupporter/:id", fetchuser, async (req, res) => {
  try {
    // Find the campaign to be updated
    let campaign = await Campaign.findById(req.params.id);
    if (!campaign) {
      return res.status(404).send("Campaign not found");
    }
    // Check if the user is already a supporter
    const userId = req.user.id;
    if (campaign.supporters.includes(userId)) {
      const index = campaign.supporters.indexOf(userId);
      if (index !== -1) {
        campaign.supporters.splice(index, 1); // Remove the user from the supporters array
        const updatedCampaign = await campaign.save();
        return res.json(updatedCampaign);
      }
    }
    // Add the user to the supporters array
    campaign.supporters.push(userId);
    // Save the updated campaign
    const updatedCampaign = await campaign.save();
    res.json(updatedCampaign);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
