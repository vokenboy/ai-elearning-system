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

exports.addExamSchema = async (req, res) => {
    try {
        const { examData } = req.body;
        const exam = new Exam({
            courseId: examData.courseId,
            topic: examData.title,
            questions_schema: examData.questions_schema,
        });
        console.log(exam)
        await exam.save();

        res.status(201).json({
            message: "Exam schema added to the course",
            exam,
        });
    } catch (error) {
        console.error("Error adding exam schema:", error);
        res.status(500).json({ error: "Server error" });
    }
};
