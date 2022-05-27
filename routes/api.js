const express = require("express");
const axios = require("axios");

const router = express.Router();

const User = require("../models/user-schema");

// Routes
//Users
router.route("/users").get((req, res) => {
  User.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});
router.post("/sign-up", (req, res) => {
  const data = req.body;

  const newUser = new User(data);
  newUser.save((error) => {
    if (error) {
      res.status(500).json({ msg: "Sorry, internal server errors" });
      return;
    }
    return res.json({
      msg: "Your data has been saved",
    });
  });
});

router.post("/sign-in", (req, res) => {
  User.findOne({ email: req.body.email })
    .then((data) => {
      if (!data || data.password !== req.body.password) {
        res.status(401).json({ error: "Invalid Email or Password" });
      } else {
        res.json(data);
      }
    })
    .catch((error) => {
      res.json(error);
    });
});

router.post("/dashboard/profile", (req, res) => {
  User.findOne({ email: req.body.email }).then((data) => {
    if (!data) {
      res.status(401).json({ error: "Invalid Email" });
    } else {
      res.json(data);
    }
  });
});

router.put("/dashboard/profile", (req, res) => {
  User.findOneAndUpdate({ email: req.body.email }, req.body).then((data) => {
    if (!data) {
      res.status(401).json({ error: "Invalid Email" });
    } else {
      res.json(data);
    }
  });
});

router.post("/forgot", (req, res) => {
  User.findOne({ email: req.body.email }).then((data) => {
    if (!data) {
      res.status(401).json({ error: "Invalid Email" });
    } else {
      //send verification mail

      
      res.json(data);
    }
  });
});
router.post("/recaptcha", async (req, res, next) => {
  if (!req.body.token) {
    return res.status(400).json({ error: "reCaptcha token is missing" });
  }

  try {
    const googleVerifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.reCaptchaSecret}&response=${req.body.token}`;
    const response = await axios.post(googleVerifyUrl);
    const { success } = response.data;
    if (success) {
      //Do sign up and store user in database
      return res.json({ success: true });
    } else {
      return res.status(400).json({ error: "Invalid Captcha. Try again." });
    }
  } catch (e) {
    return res.status(400).json({ error: "reCaptcha error." });
  }
});

module.exports = router;
