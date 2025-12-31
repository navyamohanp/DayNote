const bcrypt = require("bcrypt");
const userService = require("../services/user.service");
const { validateCreateUser } = require("../validations/user.validation");

exports.createUser = async (req, res) => {
  const { name, email, password } = req.body;

  const validationError = validateCreateUser({ name, email, password });

  if (validationError) {
    return res.status(400).json({ message: validationError });
  }

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password.trim(), saltRounds);

    const user = await userService.createUser({
      name: name.trim(),
      email: email.trim(),
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
