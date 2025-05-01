import { useEffect, useState } from "react";
import {
    Container,
    Box,
    Grid,
    Typography,
    TextField,
    InputLabel,
    FormControl,
    FormControlLabel,
    Select,
    MenuItem,
    Button,
    CardContent,
    Card,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    Hidden,
} from "@mui/material";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { enrollUserToCourse, fetchUserCoursesList } from "../api/auth/authAPI";

const CourseView = () => {
    const [courses, setCourses] = useState([]);
    const [userCourses, setUserCourses] = useState([]);
    const [fetchedCourses, setfetchedCourses] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:5000/api/courses")
            .then((res) => res.json())
            .then((data) => setCourses(data))
            .catch((err) => console.error("Error fetching courses:", err));
            fetchUserCourses()
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
            console.log("User enrolled successfully");
            setIsLoading(false);
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
            if(userCourseList != null){
                setUserCourses(userCourseList);
                setfetchedCourses(true);
            }
        } catch (err) {
            console.error(`Error fetching user courses:`, err);
            setfetchedCourses(false);
        }
    };
    return (
        <Container sx={{ mt: 5 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Course List
            </Typography>
            <Grid container spacing={6} justifyContent="center">
                {courses.map((course) => (
                    <Grid item key={course._id} xs={12} sm={6} md={4} lg={3}>
                        <Card
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                height: "100%",
                                minHeight: 250,
                                p: 2,
                                boxShadow: 3,
                            }}
                        >
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography variant="h6">
                                    {course.title}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                >
                                    {course.description}
                                </Typography>
                                <Typography variant="body2" sx={{ mt: 1 }}>
                                    <strong>Difficulty:</strong>{" "}
                                    {course.difficulty}
                                </Typography>
                                <Typography variant="body2">
                                    <strong>Created at:</strong>{" "}
                                    {new Date(
                                        course.createdAt
                                    ).toLocaleDateString()}
                                </Typography>
                            </CardContent>
                            {fetchedCourses &&
                                <Button
                                    sx={{mb:2}}
                                    variant="contained"
                                    onClick={() => handleEnroll(course._id)}
                                    disabled={userCourses.includes(course._id)}
                                >
                                    {userCourses.includes(course._id) ? "Enrolled" : "Enroll to course"}
                                </Button>}
                            <Button
                                variant="contained"
                                onClick={() => handleNavigate(course._id)}
                            >
                                View Course
                            </Button>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default CourseView;
