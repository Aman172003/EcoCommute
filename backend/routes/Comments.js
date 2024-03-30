const express = require("express");
const fetchuser = require("../middleware/fetchUser");
const router = express.Router();
const Comment = require("../models/comment");
const { body, validationResult } = require("express-validator");

// get all comments
router.get("/fetchallcomments", async (req, res) => {
  try {
    const comment = await Comment.find({});
    res.json(comment);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// add a campaign: post
router.post("/addcomment", fetchuser, async (req, res) => {
  try {
    const { content, date, author } = req.body;
    const comment = new Comment({
      user: req.user.id,
      content,
      date,
      author,
    });
    const savedComment = await comment.save();
    res.json(savedComment);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// delete the comment
router.delete("/deletecomment/:id", fetchuser, async (req, res) => {
  try {
    let comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).send("NOT FOUND");
    }
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    comment = await Comment.findByIdAndDelete(req.params.id);
    res.json({ Success: "Comment has been deleted", comment: comment });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
