const express = require("express");
const multer = require("multer");
const model = require("../model/movies");
const router = express.Router();
const path = require("path");
const fs = require("fs");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "uploads");
  },
  filename: (req, file, callBack) => {
    let today = new Date();
    let imageFilename = today.toISOString() + "_" + file.originalname;
    callBack(null, `${imageFilename}`);
  },
});

const upload = multer({ storage: storage });

router.get("/", async (request, response) => {
  try {
    const movies = await model.find({});
    response.json(movies);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

router.use("/uploads", express.static(path.join(__dirname, "../uploads")));

router.get("/image/:imageName", (req, res) => {
  const imageName = req.params.imageName;
  // Path to the image file
  const imagePath = path.join(__dirname, "../uploads", imageName);
  // Check if the image file exists
  if (fs.existsSync(imagePath)) {
    res.sendFile(imagePath);
  } else {
    res.status(404).send("Image not found");
  }
});

//Post Method
router.post("/post", upload.single("imageFile"), async (req, res) => {
  let fileName = req.file.filename;
  const data = new model({
    title: req.body.title,
    actors: req.body.actors,
    genre: req.body.genre,
    rating: req.body.rating,
    views: req.body.views,
    releaseDate: req.body.releaseDate,
    watchedDate: req.body.watchedDate,
    watched: req.body.watched,
    pinned: req.body.pinned,
    imageFilename: fileName,
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await model.findByIdAndUpdate(id, updatedData, options);

    res.send(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
