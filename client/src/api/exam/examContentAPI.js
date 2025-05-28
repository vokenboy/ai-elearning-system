import { getUserId } from "../auth/authAPI";

const examContentURL = `http://localhost:5000/api/exam_contents`;

export const generateExamQuestion = async (examSchema) => {
    try {
        const response = await fetch("http://localhost:8000/generate_exam_questions/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(examSchema),
        });

        if (!response.ok) {
            throw new Error("Failed to generate task");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error generating task:", error.message);
        throw error;
    }
};

export const getExamFeedback = async (answers) => {
    try {
        const response = await fetch("http://localhost:8000/provide_exam_feedback/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(answers),
        });

        if (!response.ok) {
            throw new Error("Failed to provide feedback");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error providing feedback:", error.message);
        throw error;
    }
};

export async function addExamWithAnswers(examData) {
    try {
        examData.userId = getUserId();

        const response = await fetch(`${examContentURL}/addExamWithAnswers`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(examData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
                errorData.error || "Failed to add exam schema to course"
            );
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
}