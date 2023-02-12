require("dotenv").config();
const clc = require("cli-color");

const path = require("path");
const fs = require("fs");

const mongoose = require("mongoose");

// connect db
mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGO_URI);

// load bootcamp model
const User = require("./models/user.model");
const Res = require("./models/res.model");
const Review = require("./models/review.model");

// load data
const userData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "data", "users.json"))
);

const resData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "data", "resources.json"))
);

const reviewData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "data", "reviews.json"))
);

const importData = async () => {
  try {
    await User.create(userData);
    await Res.create(resData);
    await Review.create(reviewData);
    console.log(clc.whiteBright.bgGreenBright("Data imported..."));
  } catch (err) {
    console.error(err);
  }
  process.exit(0);
};

const deleteData = async () => {
  try {
    await User.deleteMany();
    await Res.deleteMany();
    await Review.deleteMany();
    console.log(clc.white.bgRedBright("Data deleted..."));
  } catch (error) {
    console.error(error);
  }

  process.exit(0);
};

if (process.argv[2] == "-i") {
  importData();
} else if (process.argv[2] == "-d") {
  deleteData();
}
