const User = require("../models/User");
const jwt = require("jsonwebtoken");

const handleAccessToken = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(401);

  const accessToken = cookies.jwt;

  const foundUser = await User.findOne({ accessToken }).exec();

  if (!foundUser) return res.sendStatus(403); //Forbidden

  // evaluate jwt
  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.username !== decoded.username)
      return res.sendStatus(403);

    res.json({ accessToken });
  });
};

module.exports = { handleAccessToken };
