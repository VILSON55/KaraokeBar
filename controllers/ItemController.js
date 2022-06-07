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
    let { imgSrc, description, price } = req.body;

    const item = await prisma.item.create({
      data: {
        imgSrc,
        description,
        price,
      },
    });

    return res.status(201).json(item);
  }

  createPage(req, res) {
    res.render("pages/itemCreate", {
      title: "Criar Item",
      layout: "userLayout",
    });
  }

  async update(req, res) {
    const { imgSrc, description, price } = req.body;
    const { id } = req.params;

    const updateItem = await prisma.item.update({
      where: {
        id,
      },
      data: {
        imgSrc,
        description,
        price,
      },
    });

    return res.status(200).send(updateItem);
  }

  updatePage(req, res) {
    const { id } = req.params;
    // Aqui precisa fazer a consulta no banco e trazer as informações dos itens.
    res.render("pages/itemUpdate", {
      title: "Atualizar Item",
      layout: "userLayout",
      item: {
        // Só para testar, preencher com dados retornados do banco.
        imgSrc: "images/drink/brett-jordan-nTYiBBiuRKU-unsplash.jpg",
        description: "Cerveja Puro Malte",
        price: 10,
      },
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    const deleteItem = await prisma.item.delete({
      where: {
        id,
      },
    });

    return res.status(204).send(deleteItem);
  }
}

module.exports = new ItemController();
