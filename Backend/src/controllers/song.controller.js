const songModel = require("../models/song.model");
const id3 = require("node-id3");
const storageService = require("../services/storage.service");

async function uploadSong(req, res) {
  try {
    const songBuffer = req.file.buffer;
    const { mood } = req.body;

    const tags = id3.read(songBuffer);

    // ✅ Upload Song
    const songFile = await storageService.uploadFile({
      buffer: songBuffer,
      filename: (tags.title || "song") + ".mp3",
      folder: "/cohort-2/moodify/songs"
    });

    let posterUrl = null;

    // ✅ CASE 1: Agar song me image hai
    if (tags.image && tags.image.imageBuffer) {
      const posterFile = await storageService.uploadFile({
        buffer: tags.image.imageBuffer,
        filename: (tags.title || "poster") + ".jpeg",
        folder: "/cohort-2/moodify/posters"
      });

      posterUrl = posterFile.url;
    } 
    // ✅ CASE 2: Agar image nahi hai → default image
    else {
      posterUrl = "https://dummyimage.com/300x300/000/fff&text=No+Image";
    }

    // ✅ Save DB
    const song = await songModel.create({
      title: tags.title || "Unknown",
      url: songFile.url,
      posterUrl,
      mood
    });

    res.status(201).send(
  JSON.stringify(
    {
      message: "Song uploaded successfully",
      song
    },
    null,
    2   // 👈 indentation (2 spaces)
  )
);

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error uploading song"
    });
  }
}

async function getSongs(req, res) {

  const {mood} = req.query;

  const songs = await songModel.find({
    mood
  });

  res.status(200).json({
    message: "Songs fetched successfully",
    songs
  })
}

module.exports = { 
  uploadSong,
   getSongs
};