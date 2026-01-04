const { validateData } = require("../validations/data.validation");
const authService = require("../services/auth.service");
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
    const data = await authService.dataCollection(id, {
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
    const user = await authService.loginUser({
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
    const tokens = await authService.refreshToken(refreshToken);

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

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const data = await authService.forgotPassword({
      email,
    });

    res.status(200).json({
      code: 200,
      message: `OTP sent successfully. Your OTP is ${data.otp}`,
      data,
    });
  } catch (error) {
    if (error.message === "User not found") {
      return res.status(404).json({
        code: 404,
        message: "User not found",
      });
    }

    if (error.message === "Email is required") {
      return res.status(400).json({
        code: 400,
        message: error.message,
      });
    }
    console.error(error);
    res.status(500).json({
      code: 500,
      message: "Internal server error",
    });
  }
};

exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const data = await authService.verifyOtp({ email, otp });

    res.status(200).json({
      code: 200,
      message: "OTP verified successfully",
      data,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res.status(400).json({
      message: "Email and new password are required",
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(newPassword.trim(), 10);

    await authService.resetPassword({
      email: email.trim(),
      password: hashedPassword,
    });

    res.status(200).json({
      code: 200,
      message: "Password reset successfully",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.logout = async (req, res) => {
  const userId = req.user.userId;

  try {
    await authService.logout(userId);

    res.status(200).json({
      code: 200,
      message: "Logged out successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Internal server error",
    });
  }
};
