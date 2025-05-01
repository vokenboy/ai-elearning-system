import { jwtDecode } from "jwt-decode";
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

        // Store token in localStorage
        localStorage.setItem("jwt", data.token);

        // If user data is included in the response, store that too
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

export function getUserId() {
    try {
        const userToken = localStorage.getItem("jwt");
        if(userToken){
            const decodedToken = jwtDecode(userToken);
            return decodedToken.id;
        }
        else{
            return undefined;
        }
    }
    catch(error){
        throw new Error(error || "Failed to get userID");
    }
}

export function getUserRole() {
    const userToken = localStorage.getItem("jwt");
    let userRole = "User";
    if(userToken){
        const decodedToken = jwtDecode(userToken);
        return userRole = decodedToken.role;
    }
    return userRole;
}

export async function fetchUserCoursesList(){
    try {
        const userId = getUserId()
        if(userId == undefined){
            return null;
        }
        const response = await fetch(`${API_BASE_URL}/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(),
        });
        return await response.json();
    } catch (error) {
        throw error;
    }
}

export async function enrollUserToCourse(courseId) {
    try {
        const userId = getUserId();
        if(!userId){
            alert("Please login")
        }
        const userObj = {"userId": userId, "courseId": courseId};
        const response = await fetch(`${API_BASE_URL}/enroll/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userObj),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to enroll user");
        }

        return await response.json();
    } catch (error) {
        console.error(`Error enrolling user ${userId} to course ${courseId}:`, error);
        throw error;
    }
}