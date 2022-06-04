const express = require("express");
const axios = require("axios");
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');
var jwt = require("jsonwebtoken");

const router = express.Router();

const User = require("../models/user-schema");

const websiteUrl = process.env.WEB_URL || `http://localhost:3000`;

const nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});


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
  data.email = data.email.toLowerCase()
  User.findOne({ email: data.email })
    .then((user) => {
      if (!user) {
        // const expiration = "20m";
        const expiration = "20m";
        const token = jwt.sign(req.body, process.env.JWT_SECRET_KEY_USER, {
          expiresIn: expiration,
        });
        const verifyUrl = `${websiteUrl}/new-user/${token}`;

        console.log(`token: ${token}`);
        res.json({ msg: "valid" });
        var mailOptions = {
          from: process.env.EMAIL_ADDRESS,
          to: data.email,
          subject: "Verify your account at webshop",
          html: `<h2> ${data.firstName}! Thanks for registering on our site </h2>
                   <h4> Please verify you mail to continue...</h4>
                   <a href="${verifyUrl}">${verifyUrl}</a>`,
          //attachDataUrls: true
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log("sendmailfail " + error);
          } else {
            res.json({
              auth: true,
              token: token,
              result: data,
            });
          }
        });
        //send verification mail to: req.body.email , with: verifyUrl
      } else {
        res
          .status(409)
          .json({ msg: "There is already a user with this email." });
      }
    })
    .catch((err) => {
      res.status(409).json({ error: err });
    });
});

router.post("/sign-up/verify-email", (req, res) => {
  try {
    token = req.body.token;
    var decoded = jwt.verify(token, process.env.JWT_SECRET_KEY_USER);

    User.findOne({ email: decoded.email })
      .then((user) => {
        if (user) {
          res.status(401).json({ error: "Email already registered" });
        } else {
          bcrypt.hash(decoded.password, 10, (err, hash) => {
            decoded.password = hash;
            const newUser = new User(decoded);
            newUser.save((error) => {
              if (error) {
                res
                  .status(500)
                  .json({ msg: `Sorry, internal server errors ${error}` });
                return;
              }
              return res.json({ msg: `Hi ${newUser.firstName}, you are now registered. Welcome to our shop !!` });
            });
          });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
      });
  } catch (err) {
    switch (err.name) {
      case "TokenExpiredError":
        console.log(err.message);
        res.status(401).json({ error: "This link is expired" });
        break;
      case "JsonWebTokenError":
        //signature isnt verified
        console.log(err.message);
        res
          .status(401)
          .json({ error: "Unauthorized : This link is not valid !" });
        break;
      default:
        console.log("name :" + err.name);
        console.log("msg: " + err.message);

        res.status(500).json({ error: "Internal server error" });
    }
  }
});

router.post("/sign-in", (req, res) => {
  User.findOne({ email: req.body.email.toLowerCase() })
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

router.post("/profile", (req, res) => {
  console.log(req.body.email.toLowerCase())
  User.findOne({ email: req.body.email.toLowerCase() })
    .then((data) => {
      if (!data) {
        res.status(401).json({ error: "Invalid Email" });
      } else {
        res.json(data);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    });
});

router.put("/profile", (req, res) => {
  User.findOneAndUpdate({ email: req.body.email.toLowerCase() }, req.body)
    .then((data) => {
      if (!data) {
        res.status(401).json({ error: "Invalid Email" });
      } else {
        res.json(data);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    });
});

router.put("/profile/updatemail", (req, res) => {
  User.findOne({ email: req.body.newEmail.toLowerCase() }).then((data) => {
    if (!data) {
      let emailObj = {
        oldEmail: req.body.details.email.toLowerCase(),
        newEmail: req.body.newEmail.toLowerCase(),
      };

      User.findOneAndUpdate({ email: emailObj.oldEmail }, req.body.details)
        .then((user) => {
          if (!user) {
            res.status(401).json({ error: "Invalid Email" });
          } else {
            // ------------generate jwt-----------
            const expiration = "30m";
            const token = jwt.sign(emailObj, process.env.JWT_SECRET_KEY_EMAIL, {
              expiresIn: expiration,
            });

            const verifyUrl = `${websiteUrl}/update-email/${token}`
            var mailOptions = {
              from: process.env.EMAIL_ADDRESS,
              to: user.email,
              subject: "Verify your email address change at webshop",
              html: `<h2>Hello ${user.firstName}!</h2>
                   <h4> Please click to verify your email changing in our shop.</h4>
                   <a href="${verifyUrl}">${verifyUrl}</a>`,
            };

            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                console.log("sendmailfail " + error);
              } else {
                res.json({
                  auth: true,
                  token: token,
                  result: data,
                });
              }
            });
            console.log(`jwt: ${token} , data: ${JSON.stringify(emailObj)}`);
            //send verification mail to: req.body.email , with: verifyUrl

            res.json({
              msg: `In order to update your email we sent a verification link to your current mail. The link will be expired in ${expiration}`,
            });
          }
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({ error: "Internal server error" });
        });
    } else {
      res.status(409).json({ error: "There is a user with this email." });
    }
  });
});

router.put("/email/token", (req, res) => {
  token = req.body.token;
  try {
    var decoded = jwt.verify(token, process.env.JWT_SECRET_KEY_EMAIL);
    User.findOneAndUpdate(
      { email: decoded.oldEmail },
      { email: decoded.newEmail }
    )
      .then((user) => {
        if (!user) {
          User.findOne({ email: decoded.newEmail })
            .then((user) => {
              if (!user) {
                res.status(401).json({ error: "Invalid Email" });
              }
              else {
                res.status(401).json({ error: "Email already changed" });

              }
            })
        } else {
          res.json({
            msg: `Your Email was successfully updated !!`,
            oldEmail: decoded.oldEmail,
            newEmail: decoded.newEmail,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
      });
  } catch (err) {
    switch (err.name) {
      case "TokenExpiredError":
        console.log(err.message);
        res.status(401).json({ error: "This link is expired" });
        break;
      case "JsonWebTokenError":
        //signature isnt verified
        console.log(err.message);
        res
          .status(401)
          .json({ error: "Unauthorized : This link is not valid !" });
        break;
      default:
        console.log("name :" + err.name);
        console.log("msg: " + err.message);

        res.status(500).json({ error: "Internal server error" });
    }
  }
});

router.put("/profile/changepassword", (req, res) => {
  User.findOne({ email: req.body.email.toLowerCase() })
    .then((user) => {
      if (!user) {
        res.status(401).json({ error: "Invalid Email" });
      } else {
        bcrypt.compare(req.body.old, user.password, (err, result) => {
          if (result) {
            bcrypt.hash(req.body.new, 10, function (err, hash) {
              user.password = hash;
              user.save((err) => {
                if (err) {
                  console.log(err);
                  res.status(500).json({ error: "Internal server error" });
                }
              });

              res.json({
                msg: "New password was saved",
              });
            });
          } else {
            res.status(401).json({ error: "Old password is not correct" });
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
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
    return res
      .status(503)
      .json({ error: "Service Unavailable : reCaptcha error." });
  }
});

router.post("/forgot", async (req, res) => {
  User.findOne({ email: req.body.email .toLowerCase()})
    .then((data) => {
      if (!data) {
        res.status(401).json({ error: "Invalid Email" });
      } else {
        //jwt signing
        const expiration = "20m";
        const passwordJwt = jwt.sign({ passwordJwt: data.password }, data.password, { expiresIn: expiration })
        const token = jwt.sign(
          { email: req.body.email.toLowerCase(), passwordJwt },
          process.env.JWT_SECRET_KEY_PASSWORD,
          { expiresIn: expiration }
        );
        const verifyUrl = `${websiteUrl}/update-password/${token}`;
        var mailOptions = {
          from: process.env.EMAIL_ADDRESS,
          to: data.email,
          subject: "Change your password at webshop",
          html: `<h2> ${data.firstName}! Please change your password on our site </h2>
                   <p>this link will expire in 20 minutes</p>
                   <a href="${verifyUrl}">${verifyUrl}</a>`,
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log("sendmailfail " + error);
          } else {
            res.json({
              auth: true,
              token: token,
              result: data,
            });
          }
        });
        console.log(`jwt: ${token} , data: ${req.body.email}`);

        //send verification mail to: req.body.email , with: verifyUrl

        res.json({
          msg: `We sent a verification link to your mail. The link will be expired in ${expiration}`,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    });
});

router.post("/forgot/token", (req, res) => {
  token = req.body.token;
  try {
    let decoded = jwt.verify(token, process.env.JWT_SECRET_KEY_PASSWORD);
    User.findOne({ email: decoded.email })
      .then((data) => {
        jwt.verify(decoded.passwordJwt, data.password)
        res.json({ msg: "verified", email: decoded.email });
      }).catch(err => {
        
        res.status(409).json({ error: "This link is expired" })
        
      })
   
  } catch (err) {
    switch (err.name) {
      case "TokenExpiredError":
        console.log(err.message);
        res.status(401).json({ error: "This link is expired" });
        break;
      case "JsonWebTokenError":
        //signature isnt verified
        console.log(err.message);
        res
          .status(401)
          .json({ error: "Unauthorized : This link is not valid !" });
        break;
      default:
        console.log("name :" + err.name);
        console.log("msg: " + err.message);

        res.status(500).json({ error: "Internal server error" });
    }
  }
});

router.put("/forgot/changepassword", (req, res) => {
  User.findOne({ email: req.body.email.toLowerCase() })
    .then((user) => {
      if (!user) {
        res.status(401).json({ error: "Invalid Email" });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          user.password = hash;
          user.save((err) => {
            if (err) {
              console.log(err);
              res.status(500).json({ error: "Sorry, internal server error" });
            }
          });

          // send confirmation email about password was changed
          var mailOptions = {
            from:
              '"Your Password Changed Successfully" <webshopclientserver@gmail.com>',
            to: user.email,
            subject: "Your Password Changed Successfully",
            html: `<h2> ${user.firstName}! you changed your password </h2>
               <p>This email is a confirmation that your password changed successfully at our shop</p>`,
          };

          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log("sendmailfail " + error);
            } else {
              res.json({
                token: token,
                result: data,
                msg: "New password was saved",
              });
            }
          });
          res.json({ msg: "New password was saved" });
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    });
});

module.exports = router;
