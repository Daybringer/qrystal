const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");

// User model
const User = require("../models/User");

// Login page
router.get("/login", (req, res) => {
  res.render("login");
});

// Register page
router.get("/register", (req, res) => {
  res.render("register");
});

// Register Hangle

router.post("/register", (req, res) => {
  const { username, password, password2 } = req.body;
  let errors = [];
  // Check required fields 
  if (!username || !password || !password2) {
    errors.push({ msg: "Please fill in all fields" });
  }

  // Check password match
  if (password !== password2) {
    errors.push({ msg: "Passwords don't match" });
  }

  // Check password strength 
  if (password.length < 8) {
    errors.push({ msg: "Password is shorter than 8 characters" })
  }

  if (errors.length > 0) {
    res.render("register", {
      errors,
      username,
      password,
      password2
    });
  } else {
    // Validation passed
    User.findOne({ username: username }).then(user => {

      if (user) {
        // User exists
        errors.push({ msg: "Username is already taken." });
        res.render("register", {
          errors,
          username,
          password,
          password2
        });
      } else {
        const newUser = new User({
          username,
          password
        });

        // Hash Password
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;

            // Set password to hashed
            newUser.password = hash;
            // Save user
            newUser
              .save()
              .then(user => {
                req.flash("success_msg", "You are now registered and can log in.");
                res.redirect("/users/login")
              })
              .catch((err) => console.log(err));
          }))

      }
    })
  }
});

// Login handle
router.post('/login', (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true
  })(req, res, next);
});

// Logout Handle
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.redirect("/users/login");
});

module.exports = router;