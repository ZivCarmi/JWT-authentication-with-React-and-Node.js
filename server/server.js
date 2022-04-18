require("dotenv").config();

const express = require("express");
app = express();
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
// const refreshTokenController = require("./controllers/refreshTokenController");
const accessTokenController = require("./controllers/accessTokenController");
const logoutController = require("./controllers/logoutController");
const User = require("./models/User");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConnect");
const PORT = process.env.PORT || 3100;

connectDB();

app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) return res.sendStatus(400);

  // fetch the given user from db
  const duplicatedUser = await User.findOne({ username: username });

  // check if user is already exists
  if (duplicatedUser) return res.sendStatus(409);

  try {
    // encrypt the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // create and store the new user
    const result = await User.create({
      username: username,
      password: hashedPassword,
    });

    res.status(201).json({ message: `New user ${username} created!` });
  } catch (err) {
    res.sendStatus(500);
  }
});

app.post("/login", async (req, res) => {
  const loginData = req.body;
  const fetchedUser = await User.findOne({
    username: loginData.username,
  }).exec();

  if (!fetchedUser) return res.sendStatus(403);

  const passwordMatched = await bcrypt.compare(
    loginData.password,
    fetchedUser.password
  );

  if (passwordMatched) {
    const accessToken = jwt.sign(
      { username: fetchedUser.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    fetchedUser.accessToken = accessToken;
    await fetchedUser.save();

    res.cookie("jwt", accessToken, {
      httpOnly: true,
      sameSite: "None",
      maxAge: 60 * 60 * 24 * 1000,
      secure: true,
    });

    res.json({ accessToken });
  } else {
    res.sendStatus(401);
  }
});

app.post("/logout", async (req, res) => {
  logoutController.handleLogout(req, res);
});

app.get("/access", (req, res) => {
  accessTokenController.handleAccessToken(req, res);
});

// app.get("/refresh", (req, res) => {
//   refreshTokenController.handleRefreshToken(req, res);
// });

// function verifyJWT(req, res, next) {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];

//   if (!token) return res.sendStatus(401);

//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
//     if (err) return res.sendStatus(403);

//     req.user = decoded.user;
//     next();
//   });
// }

// app.get("/private", verifyJWT, async (req, res) => {
//   const users = await User.find();
//   if (!users) return res.status(204).json({ message: "No users found" });
//   res.json(users);
// });

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, (req, res) =>
    console.log(`Server is listening on port ${PORT}`)
  );
});
