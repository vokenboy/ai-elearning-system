import { useEffect, useState } from "react";
import {
    Container,
    Grid,
    Card,
    CardContent,
    Typography,
    Button,
} from "@mui/material";

const CourseView = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/courses")
            .then((res) => res.json())
            .then((data) => setCourses(data))
            .catch((err) => console.error("Error fetching courses:", err));
    }, []);

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
                                sx={{ mt: "auto", alignSelf: "center" }} 
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
