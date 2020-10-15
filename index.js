const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

mongoose.connect(
  process.env.db,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("DB is connected");
  }
);
const listingRouters = require("./route/listing");
const userRouters = require("./route/user");

app.use(cors());
app.use(express.json());
app.use("/api/crud", listingRouters);
app.use("/api/user", userRouters);

app.listen(PORT, () => {
  console.log("Server is running on Port at 4000");
});
