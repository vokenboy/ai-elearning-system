const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    topic : { type: String, required: false},
    score: { type: Number, required: true },
    type: {
        type: String,
        enum: ["open", "single select", "multiple select"],
        required: true,
    },
});

const ExamSchema = new mongoose.Schema(
    {
        courseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: false,
        },
        topic: { type: String, required: true },
        questions_schema: {
            type: [QuestionSchema],
            required: true,
            validate: (v) => Array.isArray(v) && v.length > 0,
        },
    },
    { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

module.exports = mongoose.model("Exam", ExamSchema);
