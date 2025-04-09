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
    Accordion
} from "@mui/material";
import axios from "axios";
import ContentCreation from "../components/ContentCreation";
import { useParams, useNavigate } from "react-router-dom";  // Import useNavigate for routing

const EditorContentPage = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(false);
    const [expanded, setExpanded] = useState(false); // Track expanded state
    const params = useParams();
    const navigate = useNavigate();  // Initialize navigate hook

    // Fetch topics when courseId changes
    useEffect(() => {
        fetchTopics();
    }, []);

    const fetchTopics = async () => {
        const courseId = params.courseId;

        if (!courseId) return;
        
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:5000/api/contents/${courseId}`);
            setTopics(response.data);
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

            {/* Add Content Button */}
            <Grid item xl={6} md={6} sm={12} xs={12}>
                <Button variant="contained" onClick={handleOpenDialog}>
                    Add Content
                </Button>
            </Grid>

            {/* Add Content Dialog */}
            <ContentCreation open={openDialog} onClose={handleCloseDialog} onSave={fetchTopics} />

            {/* Topics List */}
            <Paper elevation={3} sx={{ mt: 4, p: 2 }}>
                <Typography variant="h6" gutterBottom>
                    Topics:
                </Typography>
                {loading ? (
                    <CircularProgress />
                ) : topics.length > 0 ? (
                    <List>
                        {topics.map((topic, index) => (
                            <ListItem key={topic._id} divider sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
                                {/* Accordion takes full width */}
                                <Accordion
                                    expanded={expanded === index} // Manage expansion state per item
                                    onChange={handleAccordionChange(index)} 
                                    sx={{ width: "100%", display: "flex", flexDirection: "column" }}
                                >
                                    <AccordionSummary>
                                        <ListItemText
                                            primary={topic.topic} // Correct field from DB
                                            secondary={`Language: ${topic.language} | Tags: ${topic.tags.join(", ")}`}
                                        />
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                            {topic.description}
                                        </Typography>
                                        {/* Show Go to Topic Button when accordion is expanded */}
                                        {expanded === index && (
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                sx={{ mt: 2 }}
                                                onClick={() => navigate(`/mockup-task/${topic._id}`)} // Navigate to MockupTaskPage
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
                    <Typography variant="body1">No topics available.</Typography>
                )}
            </Paper>
        </Container>
    );
};

export default EditorContentPage;
