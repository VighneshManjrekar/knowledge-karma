const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter name"],
  },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    select: false,
  },
  subscribers: {
    type: Number,
    min: 0,
    default: 0,
  },
  profile: {
    type: String,
    default: "profile-placeholder.jpg",
  },
  resourceSubscribed: [{ type: mongoose.Schema.ObjectId, ref: "Resource" }],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

userSchema.methods.getSignToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};
userSchema.methods.matchPassword = async function (passwordEntered) {
  return await bcrypt.compare(passwordEntered + "", this.password + "");
};
userSchema.methods.createResetPassLink = function () {
  const payload = {
    email: this.email,
    id: this._id,
  };
  const secret = process.env.JWT_SECRET + this.password;
  const token = jwt.sign(payload, secret, {
    expiresIn: process.env.RESET_PASS_EXPIRE,
  });
  return `http://localhost:3000/api/auth/reset-password/${this._id}/${token}`;
};
userSchema.methods.verifyResetToken = function (token) {
  const secret = process.env.JWT_SECRET + this.password;
  return jwt.verify(token, secret);
};
userSchema.methods.subscribe = function (resourceId) {
  if (this.resourceSubscribed.includes(resourceId)) {
    return false;
  }
  this.resourceSubscribed.push(resourceId);
  return this.save();
};
userSchema.methods.unsubscribe = function (resourceId) {
  if (!this.resourceSubscribed.includes(resourceId)) {
    return false;
  }
  const newResourceSubscribed = this.resourceSubscribed.filter((resource) => {
    return resource.toString() !== resourceId.toString();
  });
  this.resourceSubscribed = newResourceSubscribed;
  return this.save();
};
module.exports = mongoose.model("User", userSchema);
