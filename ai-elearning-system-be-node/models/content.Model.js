const mongoose = require("mongoose");

const ContentSchema = new mongoose.Schema(
    {
        topic: { type: String, required: true },
        language: { type: String, required: true },
        description: { type: String, required: true },
        tags: { type: Array, required: true },
        courseId: { type: String },
    },
    { timestamps: true }
);

const Content = mongoose.model("Content", ContentSchema);
module.exports = Content;
