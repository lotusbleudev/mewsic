const cors = require("cors");
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const tracksRoutes = require("./routes/tracks");

const app = express();

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/tracks", tracksRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Connected to MongoDB & Listening on port", process.env.PORT);
    });
  })
  .catch((e) => {
    console.log(e);
  });
