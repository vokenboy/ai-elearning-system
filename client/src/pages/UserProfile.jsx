import React, { useEffect, useState } from "react";
import axios from "axios";
import { getUserData } from "../api/user/userAPI";
import { getUserSolutions } from "../api/solution/solutionAPI";
import { getCourseById } from "../api/course/courseAPI";
import UserInfoSection from "../components/UserProfile/UserInfoSection";
import SolutionCard from "../components/UserProfile/SolutionCard";

export default function UserProfile() {
    const [editMode, setEditMode] = useState(false);
    const [user, setUser] = useState(null);
    const [courses, setCourses] = useState([]);
    const [solutions, setSolutions] = useState([]);
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem("jwt");
                if (!token) {
                    console.error("Token is missing.");
                    return;
                }
                const userData = await getUserData(token);
                if (!userData) {
                    console.error("No user data returned");
                    return;
                }
                setUser(userData);
                setFormData(userData);

                if (Array.isArray(userData.courses)) {
                    const coursesData = await Promise.all(
                        userData.courses.map((id) => getCourseById(id))
                    );
                    setCourses(coursesData);
                }

                const solData = await getUserSolutions(userData._id);
                setSolutions(solData);
            } catch (err) {
                console.error("Error fetching data", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleChange = (e) =>
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSave = async () => {
        try {
            const token = localStorage.getItem("jwt");
            if (!token) {
                console.error("Token is missing.");
                return;
            }

            const { data } = await axios.put(
                "http://localhost:5000/api/users/me",
                {
                    name: formData.name,
                    email: formData.email,
                    role: formData.role,
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setUser(data);
            setEditMode(false);
        } catch (err) {
            console.error("Error updating user", err);
        }
    };

    if (loading) return <p className="text-center mt-10">Loading...</p>;
    if (!user)
        return (
            <p className="text-center mt-10 text-error">
                Error loading user data
            </p>
        );

    return (
        <div className="min-h-screen py-10">
            <div className="flex justify-center">
                <div className="card bg-base-200 w-11/12 shadow-xl rounded-lg p-8">
                    <UserInfoSection
                        editMode={editMode}
                        formData={formData}
                        handleChange={handleChange}
                        user={user}
                    />
                    <div className="ml-2 mb-4">
                        {editMode ? (
                            <>
                                <button
                                    onClick={handleSave}
                                    className="btn btn-primary btn-sm mr-2"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={() => setEditMode(false)}
                                    className="btn btn-outline btn-sm"
                                >
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => setEditMode(true)}
                                className="btn btn-outline btn-sm"
                            >
                                Edit
                            </button>
                        )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                        <div className="card bg-base-100 text-center p-4">
                            <span className="text-sm font-semibold">
                                Courses
                            </span>
                            <h3 className="text-2xl font-bold mt-1">
                                {user.courses?.length || 0}
                            </h3>
                        </div>
                    </div>
                    <h2 className="text-xl font-semibold mb-4">
                        Enrolled Courses
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                        {courses.length === 0 ? (
                            <p>No courses found.</p>
                        ) : (
                            courses.map((course) => (
                                <div
                                    key={course._id}
                                    className="card bg-base-100 shadow-md h-full"
                                >
                                    <div className="card-body">
                                        <h3 className="card-title">
                                            {course.title}
                                        </h3>
                                        <p className="mt-2 text-sm">
                                            {course.description ||
                                                "No description"}
                                        </p>
                                        <div className="mt-4">
                                            <span className="badge p-3 badge-success">
                                                {course.difficulty ||
                                                    "No difficulty"}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    <h2 className="text-xl font-semibold mb-4">
                        Submitted Solutions
                    </h2>
                    {solutions.length === 0 ? (
                        <p>No solutions submitted yet.</p>
                    ) : (
                        solutions.map((sol) => (
                            <SolutionCard key={sol._id} solution={sol} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
