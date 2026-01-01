exports.validateData = ({ username, age, gender }) => {
  if (!username || typeof username !== "string" || username.trim() === "") {
    return "Username is required";
  }

  if (username.length > 20) {
    return "Username must be less than 20 characters";
  }

  if (age !== "" && (age < 13 || age > 100)) {
    return "Age must be between 13 and 100";
  }

  if (
    gender !== "" &&
    !["Male", "Female", "Other", "Prefer not to say"].includes(gender)
  ) {
    return "Invalid gender value";
  }

  return null;
};
