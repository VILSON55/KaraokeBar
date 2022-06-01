const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class ItemController {

  async findAll(req, res) {
    const items = await prisma.item.findMany();

    return res.status(200).json(items);
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
