const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const topicSchema = new mongoose.Schema(
  {
    topic: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    description: {
        type: String,
        required: true,
    },
    tags: {
        type: Array,
        required: true,
    },
    courseId: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: false,
    },
    updatedAt: {
        type: Date,
        required: false,
    }
  }
);


const Topic = mongoose.model("Content", topicSchema);
module.exports = Topic;
