const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        difficulty: {
            type: String,
            enum: ["Beginner", "Intermediate", "Advanced"],
            required: true,
        },
        createdAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

const Courses = mongoose.model("Courses", CourseSchema);
module.exports = Courses;
