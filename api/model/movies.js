const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: String,
    actors: String,
    genre: Array,
    rating: Number,
    views: Number,
    releaseDate: String,
    watchedDate: String,
    watched: Boolean,
    pinned: Boolean,
    imageFilename: String,
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Movie", movieSchema);
