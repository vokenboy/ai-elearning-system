import { useEffect, useState } from "react";
import {
    Container,
    Box,
    Typography,
    Button,
    Paper,
    TableContainer,
    CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import {
    getAllCourses,
    deleteCourse,
    handleApiError,
} from "../api/course/courseAPI";

import CourseTable from "../components/EditorCoursePage/CourseTable";
import CourseCreateDialog from "../components/EditorCoursePage/CourseCreate";
import CourseEditDialog from "../components/EditorCoursePage/CourseEdit";

const EditorCoursePage = () => {
    const [courses, setCourses] = useState([]);
    const [openCreateDialog, setOpenCreateDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [editCourseId, setEditCourseId] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("jwt");
        if (!token) {
            setError("You must be logged in to view this page");
            navigate("/login", { state: { from: location.pathname } });
            return;
        }

        fetchCourses();
    }, [navigate]);

    const fetchCourses = async () => {
        setLoading(true);
        setError("");
        try {
            const data = await getAllCourses();
            setCourses(data);
        } catch (error) {
            const errorMessage = handleApiError(error);
            setError(errorMessage);

            if (
                errorMessage.includes("session expired") ||
                errorMessage.includes("log in again")
            ) {
                navigate("/login", { state: { from: location.pathname } });
            }
        } finally {
            setLoading(false);
        }
    };

    const handleOpenCreateDialog = () => {
        setOpenCreateDialog(true);
    };

    const handleCloseCreateDialog = (shouldRefresh = false) => {
        setOpenCreateDialog(false);
        if (shouldRefresh) {
            fetchCourses();
            setSuccess("Course created successfully");
        }
    };

    const handleEdit = (courseId) => {
        setEditCourseId(courseId);
        setOpenEditDialog(true);
    };

    const handleCloseEditDialog = (shouldRefresh = false) => {
        setOpenEditDialog(false);
        if (shouldRefresh) {
            fetchCourses();
            setSuccess("Course updated successfully");
        }
    };

    const handleNavigate = (courseID) => {
        navigate(`/editor/courses/${courseID}/content`);
    };

    const handleDelete = async (courseID) => {
        const isConfirmed = window.confirm(
            "Are you sure you want to delete this course? This action cannot be undone."
        );

        if (!isConfirmed) {
            return;
        }

        setSuccess("");
        setError("");

        try {
            await deleteCourse(courseID);
            setCourses((prevCourses) =>
                prevCourses.filter((course) => course._id !== courseID)
            );
            setSuccess("Course successfully deleted.");
        } catch (error) {
            const errorMessage = handleApiError(error);
            setError(errorMessage);

            if (
                errorMessage.includes("session expired") ||
                errorMessage.includes("log in again")
            ) {
                navigate("/login", { state: { from: location.pathname } });
            }
        }
    };

    useEffect(() => {
        let timer;
        if (success || error) {
            timer = setTimeout(() => {
                setSuccess("");
                setError("");
            }, 5000);
        }
        return () => clearTimeout(timer);
    }, [success, error]);

    return (
        <Container sx={{ mt: 5 }}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3,
                }}
            >
                <Typography variant="h4">Course Management</Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleOpenCreateDialog}
                >
                    Add Course
                </Button>
            </Box>

            {error && (
                <Typography color="error" sx={{ mb: 2 }}>
                    {error}
                </Typography>
            )}
            {success && (
                <Typography color="success.main" sx={{ mb: 2 }}>
                    {success}
                </Typography>
            )}

            <CourseCreateDialog
                open={openCreateDialog}
                onClose={handleCloseCreateDialog}
            />

            <CourseEditDialog
                open={openEditDialog}
                onClose={handleCloseEditDialog}
                courseId={editCourseId}
            />

            {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
                    <CircularProgress />
                    <Typography sx={{ ml: 2 }}>Loading courses...</Typography>
                </Box>
            ) : (
                <TableContainer component={Paper} sx={{ boxShadow: 1 }}>
                    <CourseTable
                        courses={courses}
                        onNavigate={handleNavigate}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                </TableContainer>
            )}
        </Container>
    );
};

export default EditorCoursePage;
