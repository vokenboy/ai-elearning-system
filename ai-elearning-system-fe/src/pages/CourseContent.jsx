import { useState, useEffect } from "react";
import {
    Container,
    Grid,
    Typography,
    Button,
    List,
    ListItem,
    ListItemText,
    CircularProgress,
    Paper,
    AccordionSummary,
    AccordionDetails,
    Accordion,
} from "@mui/material";
import ContentCreation from "../components/ContentCreation";
import { useParams, useNavigate } from "react-router-dom";
import { getContentByCourseId } from "../api/content/contentAPI";

const CourseContent = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        loadTopics();
    }, [params.courseId]);

    const loadTopics = async () => {
        const courseId = params.courseId;
        if (!courseId) return;

        setLoading(true);
        try {
            const data = await getContentByCourseId(courseId);
            setTopics(data);
        } catch (error) {
            console.error("Error fetching topics:", error);
        }
        setLoading(false);
    };

    const handleOpenDialog = () => setOpenDialog(true);
    const handleCloseDialog = () => setOpenDialog(false);

    const handleAccordionChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Container sx={{ mt: 5 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Course Content
            </Typography>

            <Grid item xl={6} md={6} sm={12} xs={12}>
                <Button variant="contained" onClick={handleOpenDialog}>
                    Add Content
                </Button>
            </Grid>

            <ContentCreation
                open={openDialog}
                onClose={handleCloseDialog}
                onSave={loadTopics}
            />

            <Paper elevation={3} sx={{ mt: 4, p: 2 }}>
                <Typography variant="h6" gutterBottom>
                    Topics:
                </Typography>
                {loading ? (
                    <CircularProgress />
                ) : topics.length > 0 ? (
                    <List>
                        {topics.map((topic, index) => (
                            <ListItem
                                key={topic._id}
                                divider
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    width: "100%",
                                }}
                            >
                                <Accordion
                                    expanded={expanded === index}
                                    onChange={handleAccordionChange(index)}
                                    sx={{
                                        width: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    <AccordionSummary>
                                        <ListItemText
                                            primary={topic.topic}
                                            secondary={`Language: ${
                                                topic.language
                                            } | Tags: ${topic.tags.join(", ")}`}
                                        />
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                            {topic.description}
                                        </Typography>
                                        {expanded === index && (
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                sx={{ mt: 2 }}
                                                onClick={() =>
                                                    navigate(
                                                        `/mockup-task/${topic._id}`
                                                    )
                                                }
                                            >
                                                Go to Topic
                                            </Button>
                                        )}
                                    </AccordionDetails>
                                </Accordion>
                            </ListItem>
                        ))}
                    </List>
                ) : (
                    <Typography variant="body1">
                        No topics available.
                    </Typography>
                )}
            </Paper>
        </Container>
    );
};

export default CourseContent;
