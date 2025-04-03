import { useState } from "react";
import { Grid, Typography, Button, Box, Container } from "@mui/material";
import CourseCard from "../components/CourseCard";
import CourseCreation from "../components/Forms/CourseForm";

const CourseList = () => {
    const [openDialog, setOpenDialog] = useState(false);

    const handleOpenDialog = () => setOpenDialog(true);
    const handleCloseDialog = () => setOpenDialog(false);

    const hardcodedCourses = [
        {
            _id: "1",
            title: "Frontend Essentials",
            creator: "Alice Designer",
            tags: ["html", "css", "javascript"],
            createdAt: "2025-03-20T10:30:00Z",
            topics: [
                {
                    id: "1-1",
                    title: "HTML Basics",
                    description: "Learn the structure of webpages using HTML.",
                    theory: "HTML uses elements to structure content...",
                    tags: ["html", "markup"],
                },
                {
                    id: "1-2",
                    title: "CSS Styling",
                    description: "Style your HTML with CSS.",
                    theory: "CSS allows you to control layout, color, and fonts...",
                    tags: ["css", "design"],
                },
            ],
        },
        {
            _id: "2",
            title: "Backend with Node.js",
            creator: "Bob Backend",
            tags: ["nodejs", "express", "api"],
            createdAt: "2025-02-15T09:00:00Z",
            topics: [
                {
                    id: "2-1",
                    title: "Node.js Intro",
                    description:
                        "Understand what Node.js is and why it's useful.",
                    theory: "Node.js allows JS to run on the server...",
                    tags: ["nodejs", "backend"],
                },
                {
                    id: "2-2",
                    title: "Building APIs",
                    description: "Use Express to build your first REST API.",
                    theory: "Express simplifies routing and middleware usage...",
                    tags: ["api", "express"],
                },
            ],
        },
    ];

    return (
        <Container maxWidth="xl">
            {/* <Button
                variant="contained"
                onClick={handleOpenDialog}
                sx={{ mb: 2 }}
            >
                Create Course
            </Button> */}

            <CourseCreation open={openDialog} onClose={handleCloseDialog} />

            <Grid container spacing={3}>
                {hardcodedCourses.map((course) => (
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
        </Container>
    );
};

export default CourseList;
