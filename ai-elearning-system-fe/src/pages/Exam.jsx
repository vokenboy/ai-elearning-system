import React from "react";

const exam = {
    courseId: "COURSE-123",
    questions: [
        { id: 1, text: "What is React?", score: 5 },
        { id: 2, text: "Explain the Virtual DOM.", score: 10 },
    ],
};

const Exam = () => {
    return (
        <div className="exam-page">
            <h1>Exam Page</h1>
            <p>Course ID: {exam.courseId}</p>
            <ul>
                {exam.questions.map((question) => (
                    <li key={question.id}>
                        <p>{question.text}</p>
                        <p>Score: {question.score}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Exam;
