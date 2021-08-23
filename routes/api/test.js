const express = require("express");
const router = express.Router();
const Test = require("../../models/Test");

// @route    GET api/test
// @desc     Get all comments
// @access   Public
router.get("/", async (req, res) => {
  try {
    const test = await Test.find();
    if (!test) {
      return res.status(400).json({ msg: "No comment available" });
    }
    res.json(test);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route    POST api/test
// @desc     Create or update comments
// @access   Private
router.post("/", async (req, res) => {
  // destructure the request
  const { image, title, comment, date, name } = req.body;
  // Build service object
  const commentFields = {};
  if (title) commentFields.title = title;
  if (image) commentFields.image = image;
  if (comment) commentFields.comment = comment;
  if (name) commentFields.name = name;
  if (date) commentFields.date = date;
  try {
    let comFind = await Test.findOne({ comment: req.body.comment }, {});

    if (comFind) {
      // Update
      test = await Test.findOneAndUpdate(
        { comment: req.body.comment },
        { $set: commentFields },
        { $new: true }
      );
      return res.json(test);
    }
    test = new Test(commentFields);
    await test.save();
    return res.json(test);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
