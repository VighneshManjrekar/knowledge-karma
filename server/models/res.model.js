const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add name"],
    trim: true,
    maxlength: [50, "Name cannot be more than 50 characters"],
  },
  description: {
    type: String,
    required: [true, "Please add description"],
    maxlength: [500, "Description cannot be more than 500 characters"],
  },
  branch: {
    type: String,
    enum: ["CHEM", "MECH", "COMP", "ELEC", "EXTC", "CIVIL", "OTHER"],
    required: [
      true,
      "Please enter branch from CHEM/MECH/COMP/ELEC/EXTC/CIVIL/OTHER",
    ],
  },
  year: {
    type: String,
    enum: ["FE", "SE", "TE", "BE"],
    required: [true, "Please enter year from FE/SE/TE/BE"],
  },
  subjectCode: String,
  price: {
    type: Number,
    required: [true, "Please add price"],
  },
  votes: {
    upvote: {
      type: Number,
      default: 0,
    },
    downvote: {
      type: Number,
      default: 0,
    },
  },
  type: {
    type: String,
    enum: ["NOTES", "BOOKS", "PROJECT", "ASSIGNMENT"],
    required: [
      true,
      "Please enter resource type from NOTES/BOOKS/PROJECT/ASSIGNMENT",
    ],
  },
  link: {
    type: String,
    match: [
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      "Please use a valid URL with HTTP or HTTPS",
    ],
  },
  status: { type: Boolean, default: false },
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    requried: true,
  },
  image: {
    type: String,
    default: function () {
      return `${this.type}-placeholder.jpg`;
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Resource", resourceSchema);
