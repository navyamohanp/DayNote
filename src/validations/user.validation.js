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
