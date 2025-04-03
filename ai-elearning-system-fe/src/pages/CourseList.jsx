import { useState, useEffect } from "react";
import {
    Grid,
    Box,
    Container,
    CircularProgress,
    Typography,
    Button,
} from "@mui/material";
import CourseCard from "../components/CourseCard";
import CourseCreation from "../components/Forms/CourseForm";
import { getCourses } from "../api/course/courseAPI";

const CourseList = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const handleOpenDialog = () => setOpenDialog(true);
    const handleCloseDialog = () => setOpenDialog(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getCourses();
                const normalized = data.map((course) => ({
                    ...course,
                    tags: course.tags ?? [],
                    topics: course.topics ?? [],
                }));

                setCourses(normalized);
            } catch (err) {
                console.error("Error fetching courses:", err.message);
                setError("Failed to load courses. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <Container maxWidth="xl">
            {/* Uncomment to allow course creation */}
            {/* <Button variant="contained" onClick={handleOpenDialog} sx={{ mb: 2 }}>
                Create Course
            </Button> */}

            <CourseCreation open={openDialog} onClose={handleCloseDialog} />

            {loading ? (
                <Box display="flex" justifyContent="center" mt={4}>
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Typography color="error" align="center" mt={4}>
                    {error}
                </Typography>
            ) : (
                <Grid container spacing={3}>
                    {courses.map((course) => (
                        <Grid
                            item
                            key={course._id}
                            xs={12}
                            sm={6}
                            md={4}
                            lg={3}
                            sx={{ display: "flex" }}
                        >
                            <CourseCard course={course} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
};

export default CourseList;
