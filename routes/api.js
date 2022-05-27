const express = require("express");
const axios = require("axios");
const bcrypt = require("bcrypt");

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
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    data.password = hash;
    const newUser = new User(data);
    newUser.save((error) => {
      if (error) {
        res.status(500).json({ msg: `Sorry, internal server errors ${error}` });
        return;
      }
      return res.json({ msg: "Your data has been saved", });
    });
  });
});

router.post("/sign-in", (req, res) => {
  User.findOne({ email: req.body.email })
    .then((data) => {
      bcrypt.compare(req.body.password, data.password, (err, result) => {
        if (!data || !result) {
          res.status(401).json({ error: "Invalid Password" });
        } else {
          res.json(data);
        }
      });
    })
    .catch((error) => {
      res.status(401).json({ error: "Invalid Email" });
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

router.put("/dashboard/profile/changepassword/", (req, res) => {
  User.findOne({ email: req.body.email }).then((data) => {
    if (!data) {
      res.status(401).json({ error: "Invalid Email" });
    } else {
      bcrypt.compare(req.body.old, data.password,  (err, result) =>{
        if (result) {
          bcrypt.hash(req.body.new, 10, function (err, hash) {
            data.password=hash
            data.save((err) =>{
              if (err) {
                console.log(err)
                res.status(500).json({error: "Internal server error"})
              }
             } )
            res.json({msg: "New password was saved"})

          });
        } else {
          res.status(401).json({ error: "Old password is not correct" });
        }
      });
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
