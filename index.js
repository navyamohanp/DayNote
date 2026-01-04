require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");

const route = require("./src/routes/index.js");

const PORT = 3000;

app.use(express.json());
//img upload
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api", route);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
