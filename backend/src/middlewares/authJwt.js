const jwt = require("jsonwebtoken");

verifyToken = (req, res, next) => {
  let accesstoken = req.headers["authorization"];
  // console.log(req.headers);

  if (!accesstoken?.startsWith("Bearer ")) {
    return res.status(403).json({ message: "No token provided!" });
  }

  const accessTokenParts = accesstoken.split(" ");
  const token = accessTokenParts[1];

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: "Unauthorized!",
      });
    }
    req.userId = decoded.id;
    next();
  });
};

const authJwt = {
  verifyToken,
};

module.exports = authJwt;
