const bcrypt = require("bcrypt");
const userService = require("../services/user.service");
const { validateCreateUser } = require("../validations/user.validation");
const { validateData } = require("../validations/data.validation");

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

exports.dataCollection = async (req, res) => {
  const { id } = req.params;
  const { username, age, gender } = req.body;

  const validationError = validateData({
    username,
    age,
    gender,
  });

  if (validationError) {
    return res.status(400).json({ message: validationError });
  }

  try {
    const data = await userService.dataCollection(id, {
      username,
      age,
      gender,
    });

    res.status(200).json({
      code: 200,
      message: "Onboarding data saved successfully",
      data,
    });
  } catch (error) {
    if (error.message === "User not found") {
      return res.status(404).json({ message: error.message });
    }

    res.status(500).json({ message: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password required",
    });
  }

  try {
    const user = await userService.loginUser({
      email: email.trim(),
      password,
    });

    return res.status(200).json({
      code: 200,
      message: "User logged in successfully",
      data: user,
    });
  } catch (error) {
    if (error.message === "Invalid credentials") {
      return res.status(401).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.refresh = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({
      message: "Refresh token is required",
    });
  }

  try {
    const tokens = await userService.refreshToken(refreshToken);

    return res.status(200).json({
      code: 200,
      message: "Token refreshed successfully",
      data: tokens,
    });
  } catch (error) {
    return res.status(401).json({
      message: error.message,
    });
  }
};
