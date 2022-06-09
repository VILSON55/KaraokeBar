const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class ItemController {
  async findAll(req, res) {
    const items = await prisma.item.findMany();

    return res.status(200).render("pages/items", {
      title: "Items do Cardápio",
      layout: "userLayout",
      items,
    });
  }

  async menuFindAll(req, res) {
    const items = await prisma.item.findMany();

    const drinks = items.filter((item) => item.type === "drink");
    const foods = items.filter((item) => item.type === "food");

    return res.status(200).render("pages/menu", {
      title: "Cardápio KaraokeBar",
      content: {
        title: "Cardápio",
      },
      drinks,
      foods,
    });
  }

  async create(req, res) {
    let { imgSrc, description, price,  type } = req.body;

    price = parseFloat(price);

    const item = await prisma.item.create({
      data: {
        imgSrc,
        description,
        price,
        type,
      },
    });

    return res.redirect('/menu')
  }

  createPage(req, res) {
    res.render("pages/itemCreate", {
      title: "Criar Item",
      layout: "userLayout",
    });
  }

  async update(req, res) {
    let { imgSrc, description, price, type } = req.body;
    const { id } = req.params;

    price = parseFloat(price);

    const updateItem = await prisma.item.update({
      where: {
        id,
      },
      data: {
        imgSrc,
        description,
        price,
        type
      },
    });

    return res.redirect('/menu');
  }

  async updatePage(req, res) {
    const { id } = req.params;
    
    const item = await prisma.item.findUnique({
      where: {
        id,
      }
    })

    res.render("pages/itemUpdate", {
      title: "Atualizar Item",
      layout: "userLayout",
      item,
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    const deleteItem = await prisma.item.delete({
      where: {
        id,
      },
    });

    return res.redirect('/menu');
  }
}

module.exports = new ItemController();
