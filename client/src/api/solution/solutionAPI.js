import axios from "axios";

const baseURL = "http://localhost:5000/api/solutions";

export const saveTaskSolution = async (solutionData) => {
    try {
        const response = await axios.post(baseURL, solutionData);
        console.log("Saved solution:", response.data.data);
        return response.data.data;
    } catch (error) {
        console.error(
            "Error saving task solution:",
            error.response?.status,
            error.response?.data || error.message
        );
        throw error;
    }
};

export const getUserSolutions = async (userId) => {
    try {
        const response = await axios.get(`${baseURL}/${userId}`);
        return response.data.data;
    } catch (error) {
        console.error(
            "Error fetching user solutions:",
            error.response?.data || error.message
        );
        throw error;
    }
};
