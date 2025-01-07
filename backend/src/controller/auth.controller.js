const User = require("../models/User");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const oldUser = await User.findOne({
      username,
    });

    if (oldUser) {
      return res.status(409).json({
        message: "The username already exists. Please choose a different one.",
      });
    }

    const user = new User({ username, password: bcrypt.hashSync(password, 8) });
    await user.save();
    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({
      username,
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign(
      { id: user._id.toString() },
      process.env.SECRET_KEY,
      {
        expiresIn: 86400, // 24 hours
      }
    );

    res.status(200).json({
      id: user._id,
      username: user.username,
      accessToken: token,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};
