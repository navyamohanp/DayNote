const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/;

export const validateEmail = (email: string) => {
  return emailRegex.test(email);
};

export const validateSignup = (
  name: string,
  email: string,
  password: string,
) => {
  const errors: { name?: string; email?: string; password?: string } = {};

  if (!name || name.trim() === '') {
    errors.name = 'Name is required.';
  } else if (name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters long.';
  }

  if (!email || email.trim() === '') {
    errors.email = 'Email is required.';
  } else if (!validateEmail(email.trim())) {
    errors.email = 'Invalid email format.';
  }

  if (!password) {
    errors.password = 'Password is required.';
  } else if (password.length < 8) {
    errors.password = 'Password must be at least 8 characters long.';
  } else if (!strongPasswordRegex.test(password)) {
    errors.password =
      'Password must include uppercase, lowercase, number, and special character.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
