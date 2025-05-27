const coursesURL = `http://localhost:5000/api/courses`;

const getAuthHeader = () => {
    const token = localStorage.getItem("jwt");
    return token ? `Bearer ${token}` : "";
};

export const getCertificate = async (courseId) => {
    const response = await fetch(`${coursesURL}/${courseId}/certificate`, {
        headers: {
            Authorization: getAuthHeader(),
        },
    });
    if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Failed to fetch certificate");
    }
    return await response.blob();
};

export async function getAllCourses() {
    try {
        const response = await fetch(coursesURL, {
            headers: {
                Authorization: getAuthHeader(),
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to fetch courses");
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching courses:", error);
        throw error;
    }
}

export async function getCourseById(courseId) {
    try {
        const response = await fetch(`${coursesURL}/${courseId}`, {
            headers: {
                Authorization: getAuthHeader(),
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to fetch course");
        }

        return await response.json();
    } catch (error) {
        console.error(`Error fetching course with ID ${courseId}:`, error);
        throw error;
    }
}

export async function saveCourse(courseData) {
    try {
        const response = await fetch(`${coursesURL}/saveCourse`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: getAuthHeader(),
            },
            body: JSON.stringify(courseData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to save course");
        }

        return await response.json();
    } catch (error) {
        console.error("Error saving course:", error);
        throw error;
    }
}

export async function updateCourse(courseId, courseData) {
    try {
        const response = await fetch(`${coursesURL}/${courseId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: getAuthHeader(),
            },
            body: JSON.stringify(courseData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to update course");
        }

        return await response.json();
    } catch (error) {
        console.error(`Error updating course with ID ${courseId}:`, error);
        throw error;
    }
}

export async function deleteCourse(courseId) {
    try {
        const response = await fetch(`${coursesURL}/${courseId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: getAuthHeader(),
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to delete course");
        }

        return await response.json();
    } catch (error) {
        console.error(`Error deleting course with ID ${courseId}:`, error);
        throw error;
    }
}

export function handleApiError(error) {
    if (
        error.message.includes("Failed to fetch") ||
        error.message.includes("NetworkError")
    ) {
        return "Network error: Please check your internet connection";
    }

    if (
        error.message.includes("401") ||
        error.message.includes("Unauthorized")
    ) {
        localStorage.removeItem("jwt");
        return "Session expired. Please log in again.";
    }

    if (error.message.includes("403") || error.message.includes("Forbidden")) {
        return "You don't have permission to perform this action";
    }

    return error.message || "An unknown error occurred";
}
