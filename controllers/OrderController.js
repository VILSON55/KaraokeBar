const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class OrderController {
  async findAll(req, res) {
    const orders = await prisma.order.findMany();

    return res.status(200).render("pages/orders", {
      title: "Pedido Online KaraokeBar",
      content: {
        title: "Pedido Online",
      },
      layout: "userLayout",
      orders,
    });
  }

  async createPage(req, res) {
    const items = await prisma.item.findMany();

    return res.status(200).render("pages/orderCreate", {
      title: "Pedido Online KaraokeBar",
      content: {
        title: "Pedido Online",
      },
      items,
      layout: "userLayout",
    });
  }

  async create(req, res) {
    let { tableNumber, items } = req.body;

    tableNumber = Number(tableNumber);

    let infoItems = await prisma.item.findMany({
      where: {
        id: { in: items },
      },
    });

    let itemsFormatted = "";

    infoItems.forEach((item) => {
      itemsFormatted += `${item.description}, ${item.price.toLocaleString(
        "pt-br",
        { style: "currency", currency: "BRL" }
      )} | `;
    });

    let totalPrice = infoItems.reduce((total, item) => item.price + total, 0);

    const order = await prisma.order.create({
      data: {
        tableNumber,
        items: itemsFormatted,
        totalPrice: totalPrice.toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
        }),
      },
    });

    return res.redirect("/orders");
  }

  async finish(req, res) {
    let { id } = req.params;

    const updateOrder = await prisma.order.update({
      where: {
        id,
      },
      data: {
        status: "Concluído",
      },
    });

    res.redirect("/orders");
  }

  async updatePage(req, res) {
    const { id } = req.params;

    const items = await prisma.item.findMany();

    const order = await prisma.order.findUnique({
      where: {
        id,
      },
    });

    return res.status(200).render("pages/orderUpdate", {
      title: "Atualizar Pedido",
      content: {
        title: "Atualizar Pedido",
      },
      items,
      order,
      layout: "userLayout",
    });
  }

  async update(req, res) {
    let { tableNumber, items } = req.body;
    const { id } = req.params;

    tableNumber = Number(tableNumber);

    let infoItems = await prisma.item.findMany({
      where: {
        id: { in: items },
      },
    });

    let itemsFormatted = "";

    infoItems.forEach((item) => {
      itemsFormatted += `${item.description}, ${item.price.toLocaleString(
        "pt-br",
        { style: "currency", currency: "BRL" }
      )} | `;
    });

    let totalPrice = infoItems.reduce((total, item) => item.price + total, 0);

    const updateOrder = await prisma.order.update({
      where: {
        id,
      },
      data: {
        tableNumber,
        items: itemsFormatted,
        totalPrice,
      },
    });

    return res.redirect("/orders");
  }

  async delete(req, res) {
    const { id } = req.params;

    const deleteOrder = await prisma.order.delete({
      where: {
        id,
      },
    });

    return res.redirect("/orders");
  }
}

module.exports = new OrderController();
