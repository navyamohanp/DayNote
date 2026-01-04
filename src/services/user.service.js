const User = require("../models/user.model");

const { generateAccessToken, generateRefreshToken } = require("../utils/token");

exports.createUser = async (data) => {
  const email = await User.findOne({ email: data.email, isDeleted: false });
  console.log(email, "============email");
  if (email !== null) {
    const error = new Error("Email already exists");
    error.statusCode = 409;
    throw error;
  }
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

exports.getUserById = async (id) => {
  return await User.findById(id);
};

exports.updateUser = async (userId, updateData) => {
  return await User.findByIdAndUpdate(userId, updateData, {
    new: true,
  });
};

exports.deleteUser = async (id) => {
  return await User.findByIdAndUpdate(id, { isDeleted: true });
};
