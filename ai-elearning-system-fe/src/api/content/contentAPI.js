const contentURL = "http://localhost:5000/api/contents";

// Adding content to course
export const addContent = async (contentData) => {
    try {
        const response = await fetch(`${contentURL}/addContent`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(contentData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
                errorData.error || "Failed to add content to course"
            );
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const fetchTopics = async (courseId) => {
    try {
        const url = courseId ? `${contentURL}/${courseId}` : contentURL;
        const response = await fetch(url);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to fetch topics");
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const getContentByCourseId = async (courseId) => {
    if (!courseId) {
        throw new Error("Course ID is required");
    }
    try {
        const response = await fetch(`${contentURL}/${courseId}`);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
                errorData.error || "Failed to fetch topics by course"
            );
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};
