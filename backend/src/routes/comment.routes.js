const router = require("express").Router();
const { addComment } = require("../controller/comment.controller");
const authJwt = require("../middlewares/authJwt");

// To add a post
router.post("/add", [authJwt.verifyToken], addComment);

module.exports = router;
