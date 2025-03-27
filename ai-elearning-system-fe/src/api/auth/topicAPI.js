const API_BASE_URL = "http://localhost:5000/api/topic";

export async function fetchTopicsByCourseID(courseID) {
    try {
        const response = await fetch(`${API_BASE_URL}/course/${courseID}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to fetch");
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
}