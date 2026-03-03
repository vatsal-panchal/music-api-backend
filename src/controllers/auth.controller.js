const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
//register user
async function registerUser(req, res) {
  const { username, email, password, role = "user" } = req.body;

  // check if user already exists then thow new error
  const isUserAlreadyExists = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserAlreadyExists) {
    return res.status(409).json({
      message: "user aleady exists",
    });
  }

  // convert plain text into hash
  const hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    password: hash,
    email,
    role,
  });

  //create jwt token
  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
  );

  //set token in cookies

res.cookie("token", token, {
  httpOnly: true,
});

  res.status(201).json({
    message: "User Registed successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  });
}

//login user
async function loginUser(req, res) {
  const { username, email, password } = req.body;

  const user = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    return res.status(401).json({
      message: "invalid credential",
    });
  }

  const ispasswordvalid = await bcrypt.compare(password, user.password);

  if (!ispasswordvalid) {
    return res.status(401).json({
      message: "invalid credential",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token, {
    httpOnly: true,
  });

  res.status(200).json({
    message: "user login successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  });
}

async function logoutUser(req, res) {
  res.clearCookie("token");

  res.status(200).json({
    message: "user logout successfully",
  });
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
