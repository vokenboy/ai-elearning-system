const contentURL = "http://localhost:5000/api/contents";

const getAuthHeader = () => {
    const token = localStorage.getItem("jwt");
    return token ? `Bearer ${token}` : "";
};

export const addContent = async (contentData) => {
    try {
        const response = await fetch(`${contentURL}/addContent`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: getAuthHeader(),
            },
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

export const deleteTopicById = async (topicId) => {
    if (!topicId) {
        throw new Error("Topic ID is required");
    }
    try {
        const response = await fetch(`${contentURL}/${topicId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: getAuthHeader(),
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to delete topic");
        }

        return await response.json();
    } catch (error) {
        console.error(`Error deleting topic with ID ${topicId}:`, error);
        throw error;
    }
};

export const updateTopicById = async (topicId, topicData) => {
    if (!topicId) {
        throw new Error("Topic ID is required");
    }
    try {
        const response = await fetch(`${contentURL}/${topicId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: getAuthHeader(),
            },
            body: JSON.stringify(topicData),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to update topic");
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};
