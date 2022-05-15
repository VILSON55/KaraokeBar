var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("pages/index", { title: "KaraokeBar" });
});

/* GET users listing. */
router.get("/menu", function (req, res, next) {
  res.render("pages/menu", { title: "Cardápio KaraokeBar" });
});

module.exports = router;
