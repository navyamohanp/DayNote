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

export const validateData = (username: string) => {
  const errors: { username?: string } = {};

  if (!username || username.trim() === '') {
    errors.username = 'Username is required.';
  } else if (username.trim().length < 2) {
    errors.username = 'Username must be at least 2 characters long.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateLogin = (email: string, password: string) => {
  const errors: { email?: string; password?: string } = {};

  if (!email || email.trim() === '') {
    errors.email = 'Email is required.';
  } else if (!validateEmail(email.trim())) {
    errors.email = 'Invalid email format.';
  }

  if (!password) {
    errors.password = 'Password is required.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateResetPassword = (
  password: string,
  confirmPassword: string,
) => {
  const errors: { password?: string; confirmPassword?: string } = {};

  if (!password) {
    errors.password = 'Password is required.';
  } else if (password.length < 8) {
    errors.password = 'Password must be at least 8 characters long.';
  } else if (!strongPasswordRegex.test(password)) {
    errors.password =
      'Password must include uppercase, lowercase, number, and special character.';
  }

  if (!confirmPassword) {
    errors.confirmPassword = 'Confirm Password is required.';
  } else if (password !== confirmPassword) {
    errors.confirmPassword = 'Passwords do not match.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateChangePassword = (
  oldPassword: string,
  newPassword: string,
  confirmPassword: string,
) => {
  const errors: {
    oldPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
  } = {};

  if (!oldPassword) {
    errors.oldPassword = 'Old password is required.';
  }

  if (!newPassword) {
    errors.newPassword = 'New password is required.';
  } else if (newPassword.length < 8) {
    errors.newPassword = 'Password must be at least 8 characters long.';
  } else if (!strongPasswordRegex.test(newPassword)) {
    errors.newPassword =
      'Password must include uppercase, lowercase, number, and special character.';
  }

  if (!confirmPassword) {
    errors.confirmPassword = 'Confirm Password is required.';
  } else if (newPassword !== confirmPassword) {
    errors.confirmPassword = 'Passwords do not match.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

type JournalErrors = {
  title?: string;
  journalDate?: string;
  mood?: string;
  content?: string;
};

type JournalPayload = {
  title: string;
  content: string;
  mood: string | null;
  journalDate: string;
};

export const validateJournal = ({
  title,
  content,
  mood,
  journalDate,
}: JournalPayload): JournalErrors => {
  const errors: JournalErrors = {};

  if (!title || title.trim() === '') {
    errors.title = 'Title is required.';
  } else if (title.trim().length > 100) {
    errors.title = 'Title must be less than 100 characters.';
  }

  if (!journalDate || journalDate.trim() === '') {
    errors.journalDate = 'Date is required.';
  }

  if (!mood) {
    errors.mood = 'Please select a mood.';
  }

  if (!content || content.trim() === '') {
    errors.content = 'Content is required.';
  } else if (content.trim().length < 3) {
    errors.content = 'Content must be at least 3 characters.';
  } else if (content.trim().length > 500) {
    errors.content = 'Content must be less than 500 characters.';
  }

  return errors;
};
