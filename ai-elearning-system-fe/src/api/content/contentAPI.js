const contentURL = "http://localhost:5000/api/contents";

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
