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
