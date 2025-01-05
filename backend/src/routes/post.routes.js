const router = require("express").Router();
const { addPost, getAllPost } = require("../controller/post.controller");
const authJwt = require("../middlewares/authJwt");

// To add a number post
router.post("/add", [authJwt.verifyToken], addPost);

// To get all number post
router.get("/all/:page/:limit", getAllPost);

module.exports = router;
