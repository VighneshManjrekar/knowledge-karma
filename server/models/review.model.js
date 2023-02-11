const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    maxlength: [100, "Max length is 100 characters"],
    required: [true, "Please enter title for the review"],
  },
  text: {
    type: String,
    trim: true,
    maxlength: [500, "Max length is 500 characters"],
    required: [true, "Please enter text for the review"],
  },
  rating: {
    type: Number,
    min: [1, "Please provide rating between 1-10"],
    max: [10, "Please provide rating between 1-10"],
    required: [true, "Please give honest ratings"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resource: {
    type: mongoose.Types.ObjectId,
    ref: "Resource",
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

// Prevent user from submitting more than one review per resource
reviewSchema.index({ resource: 1, user: 1 }, { unique: true });

module.exports = mongoose.model("Review", reviewSchema);
