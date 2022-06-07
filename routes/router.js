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
      title: "O bar com karaokê!",
    },
  });
});

// Rotas GET da página Cardápio

// Rotas GET da página Pedido Online
router.get("/order", orderController.orderPage);

// Rotas de Usuário
router
  .get("/loginpage", userController.loginPage)
  .get("/users", isAdmin, userController.findAll)
  .post("/admin/create", isAdmin, userController.generateAdmin)
  .get("/user/createpage", isAdmin, userController.userCreatePage)
  .post("/user/create", isAdmin, userController.create)
  .post("/login", userController.login)
  .get("/user/updatepage", userController.updatePage)
  .put("/user/update", isAuthenticated, userController.update)
  .get("/user/delete/:id", userController.delete);

// Rotas do Menu
router
  .get("/menu", itemController.menuFindAll)
  .get("/items", isAuthenticated, itemController.findAll)
  .post("/item/create", isAuthenticated, itemController.create)
  .get("/item/createpage", isAuthenticated, itemController.createPage)
  .put("/item/update/:id", isAuthenticated, itemController.update)
  .get("/item/updatepage/:id", isAuthenticated, itemController.updatePage)
  .delete("/item/delete/:id", isAuthenticated, itemController.delete);

// Rotas da Playlist
router
  .get("/musics", isAuthenticated, musicController.findAll)
  .post("/music/create", isAuthenticated, musicController.create)
  .put("/music/update/:id", isAuthenticated, musicController.update)
  .delete("/music/delete/:id", isAuthenticated, musicController.delete);

// Rotas de Pedidos
router
  .get("/orders", isAuthenticated, orderController.findAll)
  .post("/order/create", isAuthenticated, orderController.create)
  .put("/order/update/:id", isAuthenticated, orderController.update)
  .put("/order/finish/:id", isAuthenticated, orderController.finish)
  .delete("/order/delete/:id", isAuthenticated, orderController.delete);

module.exports = router;
