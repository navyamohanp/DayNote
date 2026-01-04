const journalService = require("../services/journal.service");
const validateJournal = require("../validations/journal.validation");

exports.createJournal = async (req, res) => {
  const { title, content, mood, journalDate } = req.body;
  const id = req.user.userId;
  console.log(id, "-----user");
  const validationError = validateJournal({
    title,
    content,
    mood,
    journalDate,
  });

  if (validationError) {
    return res.status(400).json({ message: validationError });
  }

  try {
    const data = await journalService.createJournal(
      title,
      content,
      mood,
      journalDate,
      id
    );

    res.status(200).json({
      code: 200,
      message: "Journal created successfully",
      data,
    });
  } catch (error) {
    console.error("Create journal error:", error);

    if (error.code === 11000) {
      return res
        .status(409)
        .json({ code: 409, message: "Journal already exists for this date" });
    }

    res.status(error.statusCode || 500).json({
      message: error.message || "Internal server error",
    });
  }
};

exports.editJournal = async (req, res) => {
  const { journalId } = req.params;
  const { title, content, mood, journalDate } = req.body;
  const userId = req.user.userId;

  const validationError = validateJournal({
    title,
    content,
    mood,
    journalDate,
  });
  if (validationError) {
    return res.status(400).json({ message: validationError });
  }

  try {
    const data = await journalService.editJournal(journalId, userId, {
      title,
      content,
      mood,
      journalDate,
    });

    if (!data) {
      return res.status(404).json({ message: "Journal not found" });
    }

    res.status(200).json({
      code: 200,
      message: "Journal updated successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// exports.getAllJournals = async (req, res) => {
//   const userId = req.user.userId;

//   try {
//     const journals = await journalService.getAllJournals(userId);

//     res.status(200).json({
//       code: 200,
//       data: journals,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

exports.getAllJournals = async (req, res) => {
  const userId = req.user.userId;

  const page = Math.max(parseInt(req.query.page) || 1, 1);
  const limit = Math.min(parseInt(req.query.limit) || 10, 50);
  const skip = (page - 1) * limit;

  try {
    const { journals, total } = await journalService.getAllJournals(
      userId,
      skip,
      limit
    );

    res.status(200).json({
      code: 200,
      data: journals,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page * limit < total,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteJournal = async (req, res) => {
  const { journalId } = req.params;
  const userId = req.user.userId;

  try {
    const deleted = await journalService.deleteJournal(journalId, userId);

    if (!deleted) {
      return res.status(404).json({ message: "Journal not found" });
    }

    res.status(200).json({
      code: 200,
      message: "Journal deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
