const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoute = require("./src/routes/auth.routes");
const postRoute = require("./src/routes/post.routes");
const commentRoute = require("./src/routes/comment.routes");

const app = express();

app.use(cors());
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull"))
  .catch((err) => {
    console.error(err);
  });

app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/numberPost", postRoute);
app.use("/api/comment", commentRoute);

let port = process.env.PORT;

if (port == null || port == "") {
  port = 5000;
}

app.listen(port, () => {
  console.log("Backend server is running! at port " + port);
});
