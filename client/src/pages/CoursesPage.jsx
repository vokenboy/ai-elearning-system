import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCourses } from "../api/course/courseAPI";
import { enrollUserToCourse, fetchUserCoursesList } from "../api/auth/authAPI";
import CourseCard from "../components/CoursesPage/CourseCard";

const CoursesPage = () => {
    const [courses, setCourses] = useState([]);
    const [userCourses, setUserCourses] = useState([]);
    const [fetchedCourses, setFetchedCourses] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const loadCourses = async () => {
            try {
                const coursesData = await getAllCourses();
                setCourses(coursesData);
                console.log(coursesData);
            } catch (err) {
                console.error("Error fetching courses:", err);
            }
        };

        loadCourses();
        fetchUserCourses();
    }, [isLoading]);

    const handleNavigate = (courseID) => {
        navigate(`/courses/${courseID}/content`);
    };

    const handleEnroll = async (courseId) => {
        setIsLoading(true);
        setError("");
        try {
            await enrollUserToCourse(courseId);
            setSuccess("User enrolled successfully");
            setIsLoading(false);
            fetchUserCourses();
        } catch (err) {
            console.error(`Error enrolling user to course ${courseId}:`, err);
            setError("Failed to enroll user to course. Please try again.");
            setIsLoading(false);
        }
    };

    const fetchUserCourses = async () => {
        setError("");
        try {
            const userCourseList = await fetchUserCoursesList();
            if (userCourseList) {
                setUserCourses(userCourseList);
                setFetchedCourses(true);
            }
        } catch (err) {
            console.error(`Error fetching user courses:`, err);
            setFetchedCourses(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {error && (
                <div className="alert alert-error mb-4">
                    <span>{error}</span>
                </div>
            )}

            {success && (
                <div className="alert alert-success mb-4">
                    <span>{success}</span>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {courses.map((course) => (
                    <CourseCard
                        key={course._id}
                        course={course}
                        isEnrolled={
                            fetchedCourses && userCourses.includes(course._id)
                        }
                        onEnroll={handleEnroll}
                        onView={handleNavigate}
                    />
                ))}
            </div>
        </div>
    );
};

export default CoursesPage;
