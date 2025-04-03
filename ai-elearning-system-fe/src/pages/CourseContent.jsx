import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import DashboardLayout from "../components/Dashboards/DashboardLayout";
import { getContentByCourseId } from "../api/content/contentAPI";
import {
    CircularProgress,
    Box,
    Typography,
    Container,
    Button,
} from "@mui/material";
import ReactMarkdown from "react-markdown";

const CourseContent = () => {
    const { courseId } = useParams();
    const [topics, setTopics] = useState([]);
    const [selectedTopicId, setSelectedTopicId] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const contentData = await getContentByCourseId(courseId);

                if (Array.isArray(contentData) && contentData.length > 0) {
                    setTopics(contentData);
                    setSelectedTopicId(contentData[0]._id);
                }
            } catch (error) {
                console.error("Failed to fetch content:", error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchContent();
    }, [courseId]);

    const selectedTopic = topics.find((t) => t._id === selectedTopicId);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" mt={4}>
                <CircularProgress />
            </Box>
        );
    }

    if (!topics.length) {
        return <Typography>No content available for this course.</Typography>;
    }

    return (
        <DashboardLayout
            topics={topics.map((topic) => ({
                id: topic._id,
                title: topic.topic,
            }))}
            onTopicSelect={(id) => setSelectedTopicId(id)}
        >
            <Container maxWidth="md">
                <Typography variant="h4" gutterBottom>
                    {selectedTopic?.topic}
                </Typography>

                <Box sx={{ mb: 3 }}>
                    <ReactMarkdown>
                        {selectedTopic?.description || ""}
                    </ReactMarkdown>
                </Box>

                {selectedTopic?.task === true && (
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ mb: 3 }}
                        onClick={() =>
                            console.log("Trigger AI task solving flow...")
                        }
                    >
                        Task
                    </Button>
                )}

                {/* <Typography variant="body1" paragraph>
                    <strong>Tags:</strong>{" "}
                    {selectedTopic?.tags?.length > 0
                        ? selectedTopic.tags.join(", ")
                        : "None"}
                </Typography> */}
            </Container>
        </DashboardLayout>
    );
};

export default CourseContent;
