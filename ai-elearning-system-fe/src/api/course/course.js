const coursesURL = "http://localhost:5000/api/courses";

// Creating course
export async function saveCourse(courseData) {
    try {
        const response = await fetch(`${coursesURL}/saveCourse`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(courseData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to save course");
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
}
