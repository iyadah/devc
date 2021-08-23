const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const { check, validationResult } = require("express-validator");
const request = require("request");
const config = require("config");
// @route    GET api/profile/me
// @desc     Test route
// @access   Public
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "avatar"]
    );

    if (!profile) {
      return res.status(400).json({ msg: "No profile for this user" });
    }
    //      setTimeout(() => res.json(profile), 2000);
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route    POST api/profile
// @desc     Create or update the user profile
// @access   Private
router.post(
  "/",
  [
    auth,
    [
      check("status", "Status is required").not().isEmpty(),
      check("skills", "Skills is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ erros: errors.array() });
    }
    // destructure the request
    const {
      website,
      skills,
      youtube,
      twitter,
      instagram,
      linkedin,
      facebook,
      company,
      location,
      bio,
      status,
      githubusername,
    } = req.body;
    // Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
      profileFields.skills = skills.split(",").map((skill) => skill.trim());
    }

    // Build social profile objects
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    try {
      let profile = await Profile.findOne({ user: req.user.id }, {});
      if (profile) {
        // Update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { $new: true }
        );
        return res.json(profile);
      }
      profile = new Profile(profileFields);
      await profile.save();
      return res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    GET api/profile/
// @desc     All profile list
// @access   Public
router.get("/", async (req, res) => {
  try {
    const profile = await Profile.find().populate("user", ["name", "avatar"]);

    if (!profile) {
      return res.status(400).json({ msg: "No profiles" });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route    GET api/profile/user/:user_id
// @desc     Get profile by user id
// @access   Public
router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);

    if (!profile) {
      return res.status(400).json({ msg: "No profile for this user" });
    }

    res.json(profile);
  } catch (err) {
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "No profile for this user" });
    }
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route    Delete api/profile/
// @desc     Delete a profile
// @access   Private
router.delete("/", auth, async (req, res) => {
  try {
    // Remove the profile and the user
    await Profile.findOneAndRemove({ user: req.user_id });
    await User.findOneAndRemove({ _id: req.user_id });

    res.json({ msg: "User deleted" });
    if (!profile) {
      return res.status(400).json({ msg: "No profiles" });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route    Put api/profile/experience
// @desc     Put experience to a profile
// @access   Private
router.put(
  "/experience",
  [
    auth,
    [
      check("title", "Title is required").not().isEmpty(),
      check("company", "Company is required").not().isEmpty(),
      check("from", "From date is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { title, company, location, from, to, current, description } =
      req.body;

    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.experience.unshift(newExp);
      await profile.save();

      res.json(profile);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server error");
    }
  }
);
// @route    Delete api/profile/experience/:exp_id
// @desc     Delete experience from a profile
// @access   Private
router.delete("/experience/:exp_id", auth, async (req, res) => {
  try {
    // Remove the profile and the user
    const profile = await Profile.findOne({ user: req.user.id });
    const removeIndex = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.exp_id);
    if (removeIndex != -1) {
      profile.experience.splice(removeIndex, 1);
      await profile.save();
      return res.json({ profile });
    }

    return res.status(400).send("Experience not found");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route    Put api/profile/education
// @desc     Put education to a profile
// @access   Private
router.put(
  "/education",
  [
    auth,
    [
      check("school", "school is required").not().isEmpty(),
      check("degree", "degree is required").not().isEmpty(),
      check("fieldofstudy", "fieldofstudy is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { school, degree, fieldofstudy, from, to, current, description } =
      req.body;

    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.education.unshift(newEdu);
      await profile.save();

      res.json(profile);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server error");
    }
  }
);
// @route    Delete api/profile/education/:exp_id
// @desc     Delete education from a profile
// @access   Private
router.delete("/education/:edu_id", auth, async (req, res) => {
  try {
    // Remove the profile and the user
    const profile = await Profile.findOne({ user: req.user.id });
    const removeIndex = profile.education
      .map((item) => item.id)
      .indexOf(req.params.edu_id);
    if (removeIndex != -1) {
      profile.education.splice(removeIndex, 1);
      await profile.save();
      return res.json({ profile });
    }

    return res.status(400).send("education not found");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route    Put api/profile/portfolio
// @desc     Put portfolio to a profile
// @access   Private
router.put(
  "/portfolio",
  [
    auth,
    [
      check("title", "Title is required").not().isEmpty(),
      check("image", "Image is required").not().isEmpty(),
      check("description", "Description  is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { title, image, description } = req.body;

    const newPortfolio = {
      title,
      image,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.portfolio.unshift(newPortfolio);
      await profile.save();

      res.json(profile);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server error");
    }
  }
);
// @route    Delete api/profile/portfolio/:portfolio_id
// @desc     Delete portfolio from a profile
// @access   Private
router.delete("/portfolio/:portfolio_id", auth, async (req, res) => {
  try {
    // Remove the profile and the user
    const profile = await Profile.findOne({ user: req.user.id });
    const removeIndex = profile.portfolio
      .map((item) => item.id)
      .indexOf(req.params.portfolio_id);
    if (removeIndex != -1) {
      profile.portfolio.splice(removeIndex, 1);
      await profile.save();
      return res.json({ profile });
    }

    return res.status(400).send("Portfolio not found");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route    GET api/profile/github/:username
// @desc     Get the repos from github based on github user
// @access   Public
router.get("/github/:username", (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&sort=created:asc&client_id=${config.get(
        "githubClientId"
      )}&client_secret=${config.get("githubSecret")}`,
      method: "GET",
      headers: { "user-agent": "node.js" },
    };
    request(options, (error, response, body) => {
      if (error) {
        console.error(error);
      }
      if (response.statusCode !== 200) {
        res.status(400).send("Github profile not found");
      }
      res.json(JSON.parse(body));
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
