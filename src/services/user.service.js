const User = require("../models/user.model");
const bcrypt = require("bcrypt");

const { generateAccessToken, generateRefreshToken } = require("../utils/token");

exports.createUser = async (data) => {
  const user = await User.create({
    name: data.name,
    email: data.email,
    password: data.password,
  });

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  user.refreshToken = refreshToken;
  await user.save();

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
    accessToken,
    refreshToken,
  };
};

exports.dataCollection = async (userId, data) => {
  console.log(userId, "======userid");
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }
  console.log(user, "=======user");
  user.username = data.username.trim();

  if (data.age !== undefined) {
    user.age = data.age;
  }

  if (data.gender !== undefined) {
    user.gender = data.gender;
  }

  await user.save();

  return {
    id: user._id,
    username: user.username,
    age: user.age,
    gender: user.gender,
  };
};

exports.loginUser = async (data) => {
  const user = await User.findOne({ email: data.email });
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(data.password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  user.refreshToken = refreshToken;
  user.accessToken = accessToken;

  await user.save();

  return user;
};
