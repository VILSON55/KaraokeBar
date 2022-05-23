var express = require("express");
var router = express.Router();

const userController = require('../controllers/UserController');
const { isAuthenticated, isAdmin } = require('../middlewares/Auth');

// Rotas GET da página Home
router.get("/", function (req, res, next) {
  res.render("pages/home", {
    title: "KaraokeBar",
    content: {
      title: "PlayList de Músicas",
    },
  });
});

// Rotas GET da página Cardápio
router.get("/menu", function (req, res, next) {
  res.render("pages/menu", {
    title: "Cardápio KaraokeBar",
    content: {
      title: "Cardápio do Dia",
    },
  });
});

// Rotas GET da página Pedido Online
router.get("/order", function (req, res, next) {
  res.render("pages/pedido", {
    title: "Pedido Online KaraokeBar",
    content: {
      title: "Pedido Online",
    },
  });
});

// Rotas de Usuário
router
  .get("/users", isAdmin, userController.findAll)
  .post("/admin/create", userController.generateAdmin)
  .post("/user/create", isAdmin, userController.create)
  .post("/login", userController.login)
  .put("/user/update", isAuthenticated, userController.update)
  .delete("/user/delete/:id", isAdmin, userController.delete)


module.exports = router;
