const mongoose = require("mongoose");
const { conUrl } = require("../config/keys");

const mongoDb = async () => {
  try {
    await mongoose.connect(conUrl);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

module.exports = mongoDb;
