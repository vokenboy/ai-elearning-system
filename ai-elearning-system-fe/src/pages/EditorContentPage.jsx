import { useState, useEffect } from "react";
import {
    Container,
    Grid,
    Typography,
    Button,
    Box,
    CircularProgress,
    Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ContentCreation from "../components/ContentCreation";
import ContentEdit from "../components/ContentEdit";
import TopicCard from "../components/TopicCard";
import { useParams } from "react-router-dom";
import {
    getContentByCourseId,
    deleteTopicById,
} from "../api/content/contentAPI";
import { getCourseById } from "../api/course/courseAPI";
import ExamCreateDialog from "../components/ExamCreate";

const EditorContentPage = () => {
    const [openCreateDialog, setOpenCreateDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openExamCreateDialog, setOpenExamCreateDialog] = useState(false);
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [courseDetails, setCourseDetails] = useState(null);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const params = useParams();
    const courseId = params.courseId;

    useEffect(() => {
        fetchCourseDetails();
        fetchCourseTopics();
    }, []);

    const fetchCourseDetails = async () => {
        if (!courseId) return;

        try {
            const courseData = await getCourseById(courseId);
            setCourseDetails(courseData);
        } catch (error) {
            console.error("Error fetching course details:", error);
            setError("Failed to load course details. Please try again.");
        }
    };

    const fetchCourseTopics = async () => {
        if (!courseId) return;

        setLoading(true);
        setError("");

        try {
            const topicsData = await getContentByCourseId(courseId);
            setTopics(topicsData);
        } catch (error) {
            console.error("Error fetching topics:", error);
            setError("Failed to load course content. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleOpenCreateDialog = () => {
        setOpenCreateDialog(true);
    };

    const handleCloseCreateDialog = (refresh = false) => {
        setOpenCreateDialog(false);
        if (refresh) {
            fetchCourseTopics();
            setSuccess("Content topic successfully created!");
            clearMessages();
        }
    };
    const handleOpenExamCreateDialog = () => {
        setOpenExamCreateDialog(true);
    };

    const handleCloseExamCreateDialog = (refresh = false) => {
        setOpenExamCreateDialog(false);
        if (refresh) {
            fetchCourseTopics();
            setSuccess("Content topic successfully created!");
            clearMessages();
        }
    };
    const handleOpenEditDialog = (topic) => {
        setSelectedTopic(topic);
        setOpenEditDialog(true);
    };

    const handleCloseEditDialog = (refresh = false) => {
        setOpenEditDialog(false);
        setSelectedTopic(null);
        if (refresh) {
            fetchCourseTopics();
            setSuccess("Content topic successfully updated!");
            clearMessages();
        }
    };

    const handleDeleteTopic = async (topic) => {
        const isConfirmed = window.confirm(
            `Are you sure you want to delete "${topic.topic}"? This action cannot be undone.`
        );

        if (!isConfirmed) {
            return;
        }

        try {
            await deleteTopicById(topic._id);
            fetchCourseTopics();
            setSuccess("Content topic successfully deleted!");
            clearMessages();
        } catch (error) {
            console.error("Error deleting topic:", error);
            setError("Failed to delete content topic. Please try again.");
        }
    };

    const clearMessages = () => {
        setTimeout(() => {
            setSuccess("");
            setError("");
        }, 5000);
    };

    const CourseHeader = () => (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
                flexWrap: { xs: "wrap", sm: "nowrap" },
                gap: 2,
            }}
        >
            <Box>
                <Typography variant="h4" gutterBottom>
                    {courseDetails?.title || "Course Content"}
                </Typography>
                {courseDetails && (
                    <Typography variant="subtitle1" color="text.secondary">
                        {courseDetails.description}
                    </Typography>
                )}
            <Button 
                sx={{ mt:2 }}
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleOpenCreateDialog}
            >
                Add Topic
            </Button>
            </Box>
            <Box sx={{ mb: 2, justifyContent: 'flex-end' }}>
                <Button
                    variant="contained"
                    color="inherit"
                    startIcon={<AddIcon />}
                    onClick={handleOpenExamCreateDialog}
                >
                    Add Exam Schema
                </Button>
            </Box>
        </Box>
    );

    return (
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            
            <CourseHeader />
            {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                </Alert>
            )}
            {success && (
                <Alert severity="success" sx={{ mb: 3 }}>
                    {success}
                </Alert>
            )}

            {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Grid container spacing={3}>
                    {topics.map((topic) => (
                        <Grid item xs={12} sm={12} md={6} key={topic._id}>
                            <TopicCard
                                topic={topic}
                                onEdit={() => handleOpenEditDialog(topic)}
                                onDelete={() => handleDeleteTopic(topic)}
                            />
                        </Grid>
                    ))}
                </Grid>
            )}

            <ContentCreation
                open={openCreateDialog}
                onClose={handleCloseCreateDialog}
                courseId={courseId}
            />

            <ExamCreateDialog
                open={openExamCreateDialog}
                onClose={handleCloseExamCreateDialog}
                courseId={courseId}
            />
            {selectedTopic && (
                <ContentEdit
                    open={openEditDialog}
                    onClose={handleCloseEditDialog}
                    topic={selectedTopic}
                    courseId={courseId}
                />
            )}
        </Container>
    );
};

export default EditorContentPage;
