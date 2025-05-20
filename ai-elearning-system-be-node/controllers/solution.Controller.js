const SolutionContent = require("../models/solution.Model");

exports.saveTaskSolution = async (req, res) => {
    const { userId, contentId, task, feedback, evaluation } = req.body;

    if (
        !userId ||
        !contentId ||
        !task ||
        feedback == null ||
        evaluation == null
    ) {
        return res.status(400).json({
            success: false,
            message:
                "userId, contentId, task, feedback and evaluation are all required.",
        });
    }

    try {
        const newSolution = new SolutionContent({
            userId,
            contentId,
            task,
            feedback,
            evaluation,
        });
        await newSolution.save();
        return res.status(201).json({ success: true, data: newSolution });
    } catch (err) {
        console.error("Error saving solution:", err);
        return res
            .status(500)
            .json({ success: false, message: "Server error saving solution." });
    }
};

exports.getUserSolutions = async (req, res) => {
    const { userId } = req.params;
    try {
        const solutions = await SolutionContent.find({ userId })
            .populate("contentId", "title")
            .sort({ createdAt: -1 });
        return res.json({ success: true, data: solutions });
    } catch (err) {
        console.error("Error fetching user solutions:", err);
        return res.status(500).json({
            success: false,
            message: "Server error fetching solutions.",
        });
    }
};
