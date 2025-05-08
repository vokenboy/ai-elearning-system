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

exports.createExam = async (req, res) => {
    try {
        const exam = new Exam(req.body);
        const saved = await exam.save();
        res.status(201).json(saved);
    } catch (err) {
        console.error("Error creating exam:", err);
        res.status(500).json({ error: err.message });
    }
};

exports.updateExam = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const updatedExam = await Exam.findByIdAndUpdate(id, updates, {
            new: true,
            runValidators: true,
        });

        if (!updatedExam) {
            return res.status(404).json({ error: "Exam not found" });
        }

        res.json(updatedExam);
    } catch (error) {
        console.error("Error updating exam:", error);
        res.status(500).json({ error: "Server error" });
    }
};

exports.deleteExam = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedExam = await Exam.findByIdAndDelete(id);

        if (!deletedExam) {
            return res.status(404).json({ error: "Exam not found" });
        }

        res.json({ message: "Exam deleted successfully" });
    } catch (error) {
        console.error("Error deleting exam:", error);
        res.status(500).json({ error: "Server error" });
    }
};
