const cors = require("cors");
require("dotenv").config();

const express = require("express");
const tracksRoutes = require("./routes/tracks");
const usersRoutes = require("./routes/users");

const app = express();

app.use(cors());
app.use(express.json({ limit: "10MB" }));

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/tracks", tracksRoutes);
app.use("/users", usersRoutes);

app.listen(process.env.PORT, () => {
  console.log("Listening on port", process.env.PORT);
});
