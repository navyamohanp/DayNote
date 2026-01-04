const Journal = require("../models/journal.model");

const normalizeDateUTC = (date) => {
  const d = new Date(date);
  return new Date(
    Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate())
  );
};

exports.createJournal = async (title, content, mood, journalDate, id) => {
  const normalizedDate = normalizeDateUTC(journalDate);

  console.log(normalizedDate, "========", id);
  const existingJournal = await Journal.findOne({
    id,
    journalDate: normalizedDate,
  });

  if (existingJournal) {
    const error = new Error("Journal already exists for this date");
    error.statusCode = 409;
    throw error;
  }
  const journal = await Journal.create({
    title,
    content,
    mood,
    journalDate: normalizedDate,
    userId: id,
  });

  return {
    journal: {
      title: journal.title,
      content: journal.content,
      mood: journal.mood,
      journalDate: journal.journalDate,
    },
  };
};

exports.editJournal = async (journalId, userId, updateData) => {
  return await Journal.findOneAndUpdate(
    { _id: journalId, userId },
    updateData,
    { new: true }
  );
};

exports.getAllJournals = async (userId, skip, limit) => {
  const [journals, total] = await Promise.all([
    Journal.find({ userId }).sort({ journalDate: -1 }).skip(skip).limit(limit),
    Journal.countDocuments({ userId }),
  ]);

  return { journals, total };
};

exports.deleteJournal = async (journalId, userId) => {
  return await Journal.findOneAndDelete({
    _id: journalId,
    userId,
  });
};
