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
} from "@mui/material";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import CourseCreation from "../components/CourseCreation";


const EditorCoursePage = () => {
    const [courses, setCourses] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:5000/api/courses")
            .then((res) => res.json())
            .then((data) => setCourses(data))
            .catch((err) => console.error("Error fetching courses:", err));
    }, []);


    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleNavigate = (courseID) => {
        navigate(`/editor/courses/${courseID}/content`);
    };

    const handleDelete = async (courseID) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this course?");
        
        if (!isConfirmed) {
            return;
        }
    
        try {
            const response = await fetch(`http://localhost:5000/api/courses/${courseID}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            });
    
            if (response.ok) {
              
                setCourses((prevCourses) => prevCourses.filter(course => course._id !== courseID));
                alert("Course successfully deleted.");
            } else {
                alert("Failed to delete course.");
            }
        } catch (error) {
            console.error("Error deleting course:", error);
        }
    };
    

    return (
        <Container sx={{ mt: 5 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Course List
            </Typography>

            <Grid item xl={6} md={6} sm={12} xs={12}>
                <Button variant="contained" onClick={handleOpenDialog}>
                    Create Course
                </Button>
            </Grid>
            <CourseCreation 
                    open={openDialog} 
                    onClose={handleCloseDialog} 
                />
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
                                <Typography variant="h6">{course.title}</Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {course.description}
                                </Typography>
                                <Typography variant="body2" sx={{ mt: 1 }}>
                                    <strong>Difficulty:</strong> {course.difficulty}
                                </Typography>
                                <Typography variant="body2">
                                    <strong>Created at:</strong> {new Date(course.createdAt).toLocaleDateString()}
                                </Typography>
                            </CardContent>
                            <Button
                                variant="contained"
                             
                                onClick={() => handleNavigate(course._id)}
                            >
                                View Course
                            </Button>

                            <Button
                                    variant="contained"
                                    color="error"
                                    onClick={() => handleDelete(course._id)}
                                >
                                    Delete
                            </Button>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default EditorCoursePage;
