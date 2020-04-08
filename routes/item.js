const express = require("express");
const router = express.Router();

// Welcome page
router.get("/hammer", (req, res) => {
  res.render("items/hammer.ejs");
});

module.exports = router;