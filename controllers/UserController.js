const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");

class UserController {
  async generateAdmin(req, res) {
    const adminAlreadyExists = await prisma.user.findUnique({
      where: {
        email: "admin",
      },
    });

    if (adminAlreadyExists) {
      return res.status(400).send("O admin já foi gerado!");
    }

    const salt = bcrypt.genSaltSync(10);
    const passwordCrypted = bcrypt.hashSync("admin", salt);

    const admin = await prisma.user.create({
      data: {
        name: "admin",
        email: "admin",
        password: passwordCrypted,
        role: "ADMIN",
      },
    });

    res.status(201).send("Admin Criado!");
  }

  async loginPage(req, res) {
    res.render("pages/login", {
      title: "Login de Usuários",
      layout: "userLayout",
    });
  }

  async login(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      const rightPassword = bcrypt.compareSync(password, user.password);

      if (rightPassword) {
        req.session.login = {
          id: user.id,
          role: user.role,
        };

        return res.redirect("/");
      }

      return res.status(400).send("Usuário ou senha inválidos!");
    }

    return res
      .status(404)
      .send("Não existe nenhum usuário cadastrado com esse email!");
  }

  async findAll(req, res) {
    const users = await prisma.user.findMany();

    return res.render("pages/users", {
      title: "Usuários",
      users,
      layout: "userLayout",
    });
  }

  userCreatePage(req, res) {
    res.render("pages/userCreate", {
      title: "Criar Usuário",
      layout: "userLayout",
    });
  }

  async create(req, res) {
    let { name, email, password } = req.body;

    const userAlreadyExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userAlreadyExists) {
      return res.status(400).send("Esse email já está em uso!");
    }

    const salt = bcrypt.genSaltSync(10);
    const passwordCrypted = bcrypt.hashSync(password, salt);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: passwordCrypted,
      },
    });

    return res.redirect("/users");
  }

  async update(req, res) {
    const { name, email, password } = req.body;
    const { id } = req.session.login;

    const salt = bcrypt.genSaltSync(10);
    const passwordCrypted = bcrypt.hashSync(password, salt);

    const updateUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        password: passwordCrypted,
        email: email,
      },
    });

    return res.status(200).send(updateUser);
  }

  async delete(req, res) {
    const { id } = req.params;

    const deleteUser = await prisma.user.delete({
      where: {
        id,
      },
    });

    return res.status(300).redirect("/users");
  }
}

module.exports = new UserController();
