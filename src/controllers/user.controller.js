const bcrypt = require("bcrypt");
const userService = require("../services/user.service");
const { validateCreateUser } = require("../validations/user.validation");
const { validateUpdateUser } = require("../validations/user.validation");

exports.createUser = async (req, res) => {
  const { name, email, password } = req.body;

  const validationError = validateCreateUser({ name, email, password });
  if (validationError) {
    return res.status(400).json({ message: validationError });
  }

  try {
    const hashedPassword = await bcrypt.hash(password.trim(), 10);

    const result = await userService.createUser({
      name: name.trim(),
      email: email.trim(),
      password: hashedPassword,
    });

    res.status(201).json({
      code: 200,
      message: "User created successfully",
      user: result.user,
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
    });
  } catch (error) {
    //beacuse in schema email property unique
    if (error.code === 11000) {
      return res.status(409).json({
        message: "Email already exists",
      });
    }
    if (error.message === "Email already exists") {
      return res.status(409).json({ message: error.message });
    }

    res.status(500).json({ message: error.message });
  }
};

exports.getUser = async (req, res) => {
  const id = req.user.userId;

  try {
    const user = await userService.getUserById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ code: 200, user: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.updateUser = async (req, res) => {
  const userId = req.user.userId;
  const { name, email, username, age, gender } = req.body;

  const validationError = validateUpdateUser({
    name,
    username,
    age,
    gender,
  });

  if (validationError) {
    return res.status(400).json({ message: validationError });
  }

  try {
    const updateData = {};

    if (name !== undefined) updateData.name = name.trim();

    if (username !== undefined) updateData.username = username.trim();
    if (age !== undefined) updateData.age = age;
    if (gender !== undefined) updateData.gender = gender;

    const user = await userService.updateUser(userId, updateData);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      code: 200,
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  const id = req.user.userId;

  if (!id) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const user = await userService.deleteUser(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      code: 200,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.uploadProfileImage = async (req, res) => {
  const userId = req.user.userId;

  if (!req.file) {
    return res.status(400).json({
      message: "Profile image is required",
    });
  }

  try {
    const imagePath = `/uploads/profile/${req.file.filename}`;

    const user = await userService.updateUser(userId, {
      profileImage: imagePath,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      code: 200,
      message: "Profile image updated successfully",
      data: {
        profileImage: imagePath,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
