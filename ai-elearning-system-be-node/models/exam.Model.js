const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    topic : { type: String, required: false},
    score: { type: Number, required: true },
    type: {
        type: String,
        enum: ["open", "single select", "multi select"],
        required: true,
    },
});

const QuestionContentSchema = new mongoose.Schema({
    id: { type: Number, required: false },
    text: { type: String, required: true },
    score: { type: Number, required: false },
    type: {
        type: String,
        enum: ["open", "singleSelect", "multiSelect"],
        required: true,
    },
    options: {
        type: [String],
        default: undefined,
    },
    answer: { type: String, required: false },
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
        questions: {
            type: [QuestionContentSchema],
            required: false,
        },
    },
    { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

module.exports = mongoose.model("Exam", ExamSchema);
