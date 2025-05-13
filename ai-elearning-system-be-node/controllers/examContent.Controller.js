const ExamContent = require("../models/examContent.Model");

exports.addExamWithAnswers = async (req, res) => {
    try {
            const { courseId, userId, topic, questions, answers } = req.body;
            const exam = new ExamContent({
                courseId: courseId,
                userId: userId,
                topic: topic,
                questions: questions,
                answers: answers,
            });
            console.log(req.body);
            await exam.save();
    
            res.status(201).json({
                message: "Content added to the course",
                exam,
            });
        } catch (error) {
            console.error("Error adding content:", error);
            res.status(500).json({ error: "Server error" });
        }
};
