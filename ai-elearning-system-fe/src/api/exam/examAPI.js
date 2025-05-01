const examURL = `http://localhost:5000/api/exams`;

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
