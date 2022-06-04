const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class MusicController {

  async findAll(req, res) {
    const musics = await prisma.music.findMany();

    return res.status(200).json(musics);
  }

  async create(req, res) {
    let { title, artist, source } = req.body;

    const music = await prisma.music.create({
      data: {
        title,
        artist,
        source,
      },
    });

    return res.status(201).json(music);
  }

  async update(req, res) {
    const { title, artist, source } = req.body;
    const { id } = req.params;

    const updateMusic = await prisma.music.update({
      where: {
        id,
      },
      data: {
        title,
        artist,
        source,
      },
    });

    return res.status(200).send(updateMusic);
  }

  async delete(req, res) {
    const { id } = req.params;

    const deleteMusic = await prisma.music.delete({
      where: {
        id,
      },
    });

    return res.status(204).send(deleteMusic);
  }
}

module.exports = new MusicController();