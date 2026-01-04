const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/;

exports.validateCreateUser = ({ name, email, password }) => {
  if (!name || typeof name !== "string" || name.trim() === "") {
    return "Name is required";
  }

  if (!email || typeof email !== "string" || email.trim() === "") {
    return "Email is required";
  }

  if (!emailRegex.test(email.trim())) {
    return "Invalid email format";
  }

  if (!password || typeof password !== "string") {
    return "Password is required";
  }

  if (password.length < 8) {
    return "Password must be at least 8 characters long";
  }

  if (!strongPasswordRegex.test(password)) {
    return "Password must include uppercase, lowercase, number, and special character";
  }

  return null; // valid
};

exports.validateUpdateUser = ({
  name,
  email,
  username,
  age,
  gender,
  password,
}) => {
  if (name !== undefined) {
    if (typeof name !== "string" || name.trim() === "") {
      return "Name must be a valid string";
    }
  }

  if (email !== undefined) {
    if (typeof email !== "string" || !emailRegex.test(email.trim())) {
      return "Invalid email format";
    }
  }

  if (username !== undefined) {
    if (typeof username !== "string" || username.trim() === "") {
      return "Username must be a valid string";
    }
    if (username.length > 20) {
      return "Username must be less than 20 characters";
    }
  }

  if (age !== undefined) {
    if (typeof age !== "number" || age < 13 || age > 100) {
      return "Age must be between 13 and 100";
    }
  }

  if (gender !== undefined) {
    if (!["Male", "Female", "Other", "Prefer not to say"].includes(gender)) {
      return "Invalid gender value";
    }
  }

  if (password !== undefined) {
    if (typeof password !== "string" || password.length < 8) {
      return "Password must be at least 8 characters long";
    }

    if (!strongPasswordRegex.test(password)) {
      return "Password must include uppercase, lowercase, number, and special character";
    }
  }

  return null;
};
