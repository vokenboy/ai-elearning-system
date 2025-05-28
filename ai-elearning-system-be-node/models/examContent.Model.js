const mongoose = require("mongoose");

const QuestionsSchema = new mongoose.Schema({
    id: { type: Number, required: false },
    question: { type: String, required: true },
    score: { type: Number, required: false },
    topic: { type: String, required: true },
    question_type: {
        type: String,
        enum: ["true/false", "single select", "multiple select"],
        required: true,
    },
    options: {
        type: [String],
        default: undefined,
    },
    answers: { type: [String], required: false },
});

const UserAnswersSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    answers: { type: [String], required: false },
    score: { 
        type: Number, 
        default: 0 },
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
            type: [UserAnswersSchema],
            required: false,
        },
        final_score: { type: Number, required: false}
    },
    { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

module.exports = mongoose.model("ExamContent", ExamContentSchema);