const validateJournal = (data) => {
  // Title (optional)
  if (data.title !== undefined) {
    if (typeof data.title !== "string") {
      return "Title must be a string";
    }

    if (data.title.trim().length > 100) {
      return "Title cannot exceed 100 characters";
    }
  }

  // Content (required)
  if (!data.content || typeof data.content !== "string") {
    return "Content is required";
  }

  if (data.content.trim().length < 3) {
    return "Content must be at least 3 characters";
  }

  if (data.content.trim().length > 500) {
    return "Content must be maximum 500 characters";
  }

  // Mood (optional, fixed values)
  const allowedMoods = ["sad", "neutral", "happy", "very_happy"];
  if (data.mood && !allowedMoods.includes(data.mood)) {
    return "Mood must be one of: sad, neutral, happy, very_happy";
  }

  // 📅 Journal Date (required)
  if (!data.journalDate) {
    return "Journal date is required";
  }

  const journalDate = new Date(data.journalDate);

  // Invalid date check
  if (isNaN(journalDate.getTime())) {
    return "Journal date must be a valid date";
  }

  // Optional: prevent future dates
  const today = new Date();
  today.setHours(23, 59, 59, 999);

  if (journalDate > today) {
    return "Journal date cannot be in the future";
  }

  return null;
};

module.exports = validateJournal;
