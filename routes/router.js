var express = require("express");
var router = express.Router();

const userController = require("../controllers/UserController");
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
  .get("/userpage", (req, res) => {
    // Só para testes
    class User {
      constructor(id, name, email, role) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
      }
    }
    const userList = [
      new User(1, "Lucas", "lcs@email.com", "user"),
      new User(2, "Marcus", "mrcs@email.com", "admin"),
    ];
    res.render("pages/users", {
      title: "Usuários",
      layout: "userLayout",
      user: userList,
    });
  })
  .get("/users", isAdmin, userController.findAll)
  .post("/admin/create", userController.generateAdmin)
  .post("/user/create", isAdmin, userController.create)
  .post("/login", userController.login)
  .put("/user/update", isAuthenticated, userController.update)
  .delete("/user/delete/:id", isAdmin, userController.delete);

module.exports = router;
