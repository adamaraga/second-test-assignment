const router = require("express").Router();
const { register, login } = require("../controller/auth.controller");

// To register a user
router.post("/register", register);

// To login a user
router.post("/login", login);

module.exports = router;
