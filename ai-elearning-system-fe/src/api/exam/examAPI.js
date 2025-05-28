const examURL = `http://localhost:5000/api/exams`;

const getAuthHeader = () => {
    const token = localStorage.getItem("jwt");
    return token ? `Bearer ${token}` : "";
};

export async function getExamByCourseId(courseId) {
    try {
        const response = await fetch(`${examURL}/${courseId}`);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to fetch exam");
        }

        return await response.json();
    } catch (error) {
        console.error(`Error fetching exam with ID ${courseId}:`, error);
        throw error;
    }
}
export async function addExamSchema(examSchemaData) {
    try {
        const response = await fetch(`${examURL}/addExamSchema`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: getAuthHeader(),
            },
            body: JSON.stringify(examSchemaData),
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