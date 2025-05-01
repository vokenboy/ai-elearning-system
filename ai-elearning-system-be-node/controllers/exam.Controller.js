const Exam = require("../models/exam.Model");

exports.getExamByCourseId = async (req, res) => {
    try {
        const { id } = req.params;
        const exams = await Exam.find({ courseId: id });

        if (!exams || exams.length === 0) {
            return res
                .status(404)
                .json({ error: "No exams found for this course" });
        }

        res.json(exams);
    } catch (error) {
        console.error("Error getting exams:", error);
        res.status(500).json({ error: "Server error" });
    }
};
