const mongoose = require("mongoose");

const QuestionsSchema = new mongoose.Schema({
    id: { type: Number, required: false },
    question: { type: String, required: true },
    score: { type: Number, required: false },
    question_type: {
        type: String,
        enum: ["open", "single select", "multiple select"],
        required: true,
    },
    options: {
        type: [String],
        default: undefined,
    },
    answers: { type: [String], required: false },
});

const ExamContentSchema = new mongoose.Schema(
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
        questions: {
            type: [QuestionsSchema],
            required: false,
        },
        user_answers: {
            type: {},
            required: false,
        }
    },
    { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

module.exports = mongoose.model("ExamContent", ExamContentSchema);