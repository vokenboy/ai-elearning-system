
const QuestionsSchema = new mongoose.Schema({
    id: { type: Number, required: false },
    text: { type: String, required: true },
    score: { type: Number, required: false },
    type: {
        type: String,
        enum: ["open", "single select", "multiple select"],
        required: true,
    },
    options: {
        type: [String],
        default: undefined,
    },
    answer: { type: String, required: false },
});

const ExamQuestionsSchema = new mongoose.Schema(
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
    },
    { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

module.exports = mongoose.model("ExamQuestion", ExamQuestionsSchema);