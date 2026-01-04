const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
    },
    accessToken: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    username: {
      type: String,
      trim: true,
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
    },
    profileImage: {
      type: String,
    },
    resetOtp: {
      type: String,
    },

    resetOtpExpires: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
