const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class OrderController {

  async findAll(req, res) {
    const orders = await prisma.order.findMany();

    return res.status(200).json(orders);
  }

  async create(req, res) {
    let { tableNumber, items } = req.body;

    let itemsFormatted = ''

    items.forEach(item => {
        itemsFormatted += `${item.description}, ${item.price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}<br>`;
    })

    let totalPrice = items.reduce((total, item) => item.price + total, 0)

    const order = await prisma.order.create({
      data: {
        tableNumber,
        items: itemsFormatted,
        totalPrice,
      },
    });

    return res.status(201).json(order);
  }

  async finish(req, res) {
      let { id } = req.params

      const updateOrder = await prisma.order.update({
          where: {
              id,
          },
          data: {
              status: "Concluído"
          }
      });

      res.status(200).send("Status Atualizado");
  }

  async update(req, res) {
    const { tableNumber, items } = req.body;
    const { id } = req.params;

    let itemsFormatted = ''

    items.forEach(item => {
        itemsFormatted += `${item.description}, ${item.price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}<br>`;
    })

    let totalPrice = items.reduce((total, item) => item.price + total, 0)

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

    return res.status(200).send(updateOrder);
  }

  async delete(req, res) {
    const { id } = req.params;

    const deleteOrder = await prisma.order.delete({
      where: {
        id,
      },
    });

    return res.status(204).send(deleteOrder);
  }
}

module.exports = new OrderController();
