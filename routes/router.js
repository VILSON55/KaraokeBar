var express = require("express");
var router = express.Router();

// Rotas GET da página Home
router.get("/", function (req, res, next) {
  res.render("pages/index", {
    title: "KaraokeBar",
  });
});

// Rotas GET da página Cardápio
router.get("/menu", function (req, res, next) {
  res.render("pages/menu", {
    title: "Cardápio KaraokeBar",
  });
});

// Rotas GET da página Pedido Online
router.get("/order", function (req, res, next) {
  res.render("pages/menu", {
    title: "Pedido Online KaraokeBar",
  });
});

module.exports = router;
