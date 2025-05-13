import { getUserId } from "../auth/authAPI";

const exam_contentURL = `http://localhost:5000/api/exam_contents`;

export const generateExamQuestion = async (examSchema) => {
    try {
        const response = await fetch("http://localhost:8000/generate_exam_question/", {
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

export async function addExamWithAnswers(examData) {
    try {
        examData.userId = getUserId();
        console.log(examData)

        const response = await fetch(`${exam_contentURL}/addExamWithAnswers`, {
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