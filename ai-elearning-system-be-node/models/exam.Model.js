const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    text: { type: String, required: true },
    score: { type: Number, required: true },
    type: {
        type: String,
        enum: ["open", "singleSelect", "multiSelect"],
        required: true,
    },
    options: {
        type: [String],
        default: undefined,
    },
});

const ExamSchema = new mongoose.Schema(
    {
        courseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true,
        },
        topic: { type: String, required: true },
        questions: {
            type: [QuestionSchema],
            required: true,
            validate: (v) => Array.isArray(v) && v.length > 0,
        },
    },
    { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

module.exports = mongoose.model("Exam", ExamSchema);
