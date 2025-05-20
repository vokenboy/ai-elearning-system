import axios from "axios";

const baseURL = `http://localhost:5000/api/users`;

export const getUserData = async (token) => {
    try {
        const { data: userData } = await axios.get(`${baseURL}/me`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return userData;
    } catch (error) {
        console.error("Error fetching user data:", error.message);
        throw error;
    }
};
