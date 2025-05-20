const mongoose = require("mongoose");

const solutionContentSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: false,
        },
        contentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Content",
            required: true,
        },
        feedback: {
            type: String,
            required: true,
        },
        evaluation: {
            type: Number,
            required: true,
        },
        task: {
            type: String,
            required: true,
        },
    },
    { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

module.exports = mongoose.model("SolutionContent", solutionContentSchema);
