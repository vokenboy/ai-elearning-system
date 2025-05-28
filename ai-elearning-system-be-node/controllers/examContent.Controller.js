const ExamContent = require("../models/examContent.Model");

exports.addExamWithAnswers = async (req, res) => {
    try {
        const { courseId, userId, topic, questions, user_answers, final_score } = req.body;
        if (!Array.isArray(questions) || !Array.isArray(user_answers)) {
            return res.status(400).json({ error: "Invalid format: questions and user_answers must be arrays." });
        }
        const exam = new ExamContent({
            courseId,
            userId,
            topic,
            questions,
            user_answers: user_answers,
            final_score: final_score,
        });
        await exam.save();

        res.status(201).json({
            message: "Exam content added to the course",
            exam,
        });
    } catch (error) {
        console.error("Error adding exam content:", error);
        res.status(500).json({ error: "Server error" });
    }
};
