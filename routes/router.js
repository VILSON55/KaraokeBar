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

// Rotas de Usuário
router
  .get("/loginpage", userController.loginPage)
  .get("/dashboard", isAdmin, userController.dashBoard)
  .get("/users", isAdmin, userController.findAll)
  .post("/admin/create", isAdmin, userController.generateAdmin)
  .get("/user/createpage", isAdmin, userController.userCreatePage)
  .post("/user/create", isAdmin, userController.create)
  .post("/login", userController.login)
  .get("/user/updatepage/:id", isAdmin, userController.updatePage)
  .post("/user/update/:id", isAdmin, userController.update)
  .get("/user/delete/:id", isAdmin, userController.delete);

// Rotas do Menu
router
  .get("/menu", itemController.menuFindAll)
  .get("/items", isAuthenticated, itemController.findAll)
  .post("/item/create", isAuthenticated, itemController.create)
  .get("/item/createpage", isAuthenticated, itemController.createPage)
  .post("/item/update/:id", isAuthenticated, itemController.update)
  .get("/item/updatepage/:id", isAuthenticated, itemController.updatePage)
  .get("/item/delete/:id", isAuthenticated, itemController.delete);

// Rotas da Playlist
router
  .get("/musics", isAuthenticated, musicController.findAll)
  .post("/music/create", isAuthenticated, musicController.create)
  .get("/music/createpage", isAuthenticated, musicController.createPage)
  .post("/music/update/:id", isAuthenticated, musicController.update)
  .get("/music/updatepage/:id", isAuthenticated, musicController.updatePage)
  .get("/music/delete/:id", isAuthenticated, musicController.delete);

// Rotas de Pedidos
router
  .get("/orders", isAuthenticated, orderController.findAll)
  .post("/order/create", orderController.create)
  .get("/order/createpage", orderController.createPage)
  .post("/order/update/:id", isAuthenticated, orderController.update)
  .get("/order/updatepage/:id", isAuthenticated, orderController.updatePage)
  .get("/order/finish/:id", isAuthenticated, orderController.finish)
  .get("/order/delete/:id", isAuthenticated, orderController.delete);

module.exports = router;
