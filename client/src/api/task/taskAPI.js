import axios from "axios";

const codeAPI = axios.create({
    baseURL: "https://emkc.org/api/v2/piston"
})

export const generateTask = async (taskData) => {
    try {
        const response = await fetch("http://localhost:8000/generate_task/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(taskData),
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

export const executeCode = async(language, version, sourceCode) => {
    const response = await codeAPI.post("/execute", {
        "language": language,
        "version": version,
        "files": [
            {
                "content": sourceCode,
            },
        ],
    });
    return response.data;
}

export const evaluateTask = async (evaluationData) => {
    try {
        const response = await fetch("http://localhost:8000/evaluate_task/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(evaluationData),
        });

        if (!response.ok) {
            throw new Error("Failed to evaluate task");
        }

        const data = await response.json();
        return data; 
    } catch (error) {
        console.error("Error evaluating task:", error.message);
        throw error;
    }
};

