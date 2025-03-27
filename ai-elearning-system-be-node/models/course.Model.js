const mongoose = require("mongoose");

const bcrypt = require("bcrypt");

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    difficulty: {
        type: String,
        required: true,
      },
    createdAt: {
        type: Date,
        required: true,
      },
  }
);


const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
