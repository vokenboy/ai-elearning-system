const API_BASE_URL = "http://localhost:5000/api/users";

export async function registerUser(userData) {
    try {
        const response = await fetch(`${API_BASE_URL}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to register user");
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
}

export async function loginUser(credentials) {
    try {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to login");
        }

        const data = await response.json();

        localStorage.setItem("jwt", data.token);

        if (data.user) {
            localStorage.setItem("user", JSON.stringify(data.user));
        }

        return data;
    } catch (error) {
        throw error;
    }
}

export function logoutUser() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
}

export function isLoggedIn() {
    return localStorage.getItem("jwt") !== null;
}

export function getUser() {
    const userString = localStorage.getItem("user");
    return userString ? JSON.parse(userString) : null;
}
