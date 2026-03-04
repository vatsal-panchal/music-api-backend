const musicModel = require("../models/music.model");
const albumModel = require("../models/album.model");
const { uploadFile } = require("../services/storage.service");

// Upload Song
async function createMusic(req, res) {
  try {
    const { title } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const uploaded = await uploadFile(file.buffer);

    const music = await musicModel.create({
      title,
      uri: uploaded.url,
      artist: req.user.id,
    });

    res.status(201).json(music);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
}

// Create Album
async function createAlbum(req, res) {
  try {
    const { title } = req.body;

    const album = await albumModel.create({
      title,
      artist: req.user.id,
    });

    res.status(201).json(album);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
}

// Get All Musics
async function getAllMusics(req, res) {
  try {
    const musics = await musicModel.find().populate("artist", "username");
    res.status(200).json(musics);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
}

// Get All Albums
async function getAllAlbums(req, res) {
  try {
    const albums = await albumModel.find().populate("artist", "username").populate("musics");
    res.status(200).json(albums);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
}

// Get Album By ID
async function getAlbumById(req, res) {
  try {
    const { albumId } = req.params;
    const album = await albumModel
      .findById(albumId)
      .populate("artist", "username")
      .populate("musics");

    if (!album) {
      return res.status(404).json({ message: "Album not found" });
    }

    res.status(200).json(album);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
}

module.exports = {
  createMusic,
  createAlbum,
  getAllMusics,
  getAllAlbums,
  getAlbumById,
};