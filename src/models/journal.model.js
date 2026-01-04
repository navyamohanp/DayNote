const mongoose = require("mongoose");

const journalSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    content: {
      type: String,
      trim: true,
    },
    mood: {
      type: String,
    },
    journalDate: {
      type: Date,
      required: true,
      index: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);
journalSchema.index({ userId: 1, journalDate: 1 }, { unique: true });

module.exports = mongoose.model("Journal", journalSchema);
