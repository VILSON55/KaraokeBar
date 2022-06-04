var express = require("express");
var router = express.Router();

const userController = require("../controllers/UserController");
const itemController = require("../controllers/ItemController");
const musicController = require("../controllers/MusicController");
const orderController = require("../controllers/OrderController");
const { isAuthenticated, isAdmin } = require("../middlewares/Auth");

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
  .get("/loginpage", (req, res) => {
    res.render("pages/login", {
      title: "Login de Usuários",
      layout: "userLayout",
    });
  })
  .get("/users", isAdmin, userController.findAll)
  .post("/admin/create", userController.generateAdmin)
  .post("/user/create", isAdmin, userController.create)
  .post("/login", userController.login)
  .put("/user/update", isAuthenticated, userController.update)
  .get("/user/delete/:id", userController.delete);

  // Rotas do Menu
  router
  .get("/items", isAuthenticated, itemController.findAll)
  .post("/item/create", isAuthenticated, itemController.create)
  .put("/item/update/:id", isAuthenticated, itemController.update)
  .delete("/item/delete/:id", isAuthenticated, itemController.delete)

  // Rotas da Playlist
  router
  .get("/musics", isAuthenticated, musicController.findAll)
  .post("/music/create", isAuthenticated, musicController.create)
  .put("/music/update/:id", isAuthenticated, musicController.update)
  .delete("/music/delete/:id", isAuthenticated, musicController.delete)

  // Rotas de Pedidos
  router
  .get("/orders", isAuthenticated, orderController.findAll)
  .post("/order/create", isAuthenticated, orderController.create)
  .put("/order/update/:id", isAuthenticated, orderController.update)
  .put("/order/finish/:id", isAuthenticated, orderController.finish)
  .delete("/order/delete/:id", isAuthenticated, orderController.delete)
  
module.exports = router;
