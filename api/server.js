require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

//console.log(process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const movieRouter = require("./routes/movie-routes");
app.use("/api/movies", movieRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
