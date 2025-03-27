const coursesURL = "http://localhost:5000/api/courses";
const contentURL = "http://localhost:5000/api/contents";

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

// Adding content to course
export async function addContent(contentData) {
    try {
        const response = await fetch(`${contentURL}/addContent`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(contentData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to add content to course");
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
}