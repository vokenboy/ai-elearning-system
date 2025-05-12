import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box,
    Typography,
    CircularProgress,
    Alert,
    IconButton,
} from "@mui/material";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { addExamSchema } from "../api/exam/examAPI";
import { getContentByCourseId } from "../api/content/contentAPI";
import { getCourseById } from "../api/course/courseAPI";

const QUESTION_TYPES = ["open", "single select", "multiple select"];

const ExamCreateDialog = ({ open, onClose, onSave, courseId }) => {
    const [formData, setFormData] = useState([
        {
            topic: "",
            score: 1,
            type: QUESTION_TYPES[0],
        }
    ]);
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        (async () => {
            try {
                const topics = await getContentByCourseId(courseId);
                setTopics(topics);
            } catch (err) {
                setErrorMessage(err.message);
            }
        })();
        if (open) {
            setFormData([{
                topic: topics[0]?.topic || "",
                score: 1,
                type: QUESTION_TYPES[0],
            }]);

            setError("");
            setSuccess("");
        }
    }, [open]);

    const handleChange = (index, e) => {
        const values = [...formData];
        values[index][e.target.name] = e.target.value;
        setFormData(values);
        console.log(values)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const course = await getCourseById(courseId);
            let title = course.title;
            const questions_schema = formData.map((schema, index) => ({
                id: index,
                ...schema,
            }));
            await addExamSchema({
                examData: {
                    title,
                    courseId,
                    questions_schema: questions_schema
                }
            });
            setSuccess("Exam created successfully!");
            setTimeout(() => {
                if (onSave) onSave();
                onClose(true);
            }, 1000);
        } catch (err) {
            console.error("Error creating exam:", err);
            setError(
                err.message || "Failed to create exam schema. Please try again."
            );
            setLoading(false);
        }
    };

    const handleAddFields = () => {
        setFormData([...formData,
        { topic: topics[0].topic, score: 1, type: QUESTION_TYPES[0], }]);
    };

    const handleRemoveFields = (index) => {
        const values = [...formData];
        values.splice(index, 1);
        setFormData(values);
    };

    return (
        <Dialog
            open={open}
            onClose={() => onClose(false)}
            fullWidth
            maxWidth="lg"
        >
            <DialogTitle>
                <Typography>Add Exam Schema</Typography>
            </DialogTitle>

            <DialogContent dividers>
                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}
                {success && (
                    <Alert severity="success" sx={{ mb: 2 }}>
                        {success}
                    </Alert>
                )}

                {formData.map((data, index) => (
                    <Box
                        key={index}
                        sx={{
                            display: "flex",
                            flexDirection: { xs: "column", md: "row" },
                            gap: 2,
                        }}
                    >
                        <FormControl
                            fullWidth
                            margin="normal"
                            disabled={loading}
                        >
                            <InputLabel>Course topic</InputLabel>
                            <Select
                                name="topic"
                                value={data.topic}
                                onChange={(e) => handleChange(index, e)}
                                label="Course topic"
                            >
                                {topics.map((topic) => (
                                    <MenuItem key={topic.topic} value={topic.topic}>
                                        {topic.topic}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl
                            fullWidth
                            margin="normal"
                            disabled={loading}
                        >
                            <InputLabel>Question type</InputLabel>
                            <Select
                                name="type"
                                value={data.type}
                                onChange={(e) => handleChange(index, e)}
                                label="Question type"
                            >
                                {QUESTION_TYPES.map((type) => (
                                    <MenuItem key={type} value={type}>
                                        {type}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl
                            margin="normal"
                            disabled={loading}
                        >
                            <TextField
                                name="score"
                                label="Score"
                                type="number"
                                variant="outlined"
                                required
                                value={data.score}
                                onChange={(e) => handleChange(index, e)}
                                disabled={loading}
                            />
                        </FormControl>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                            <IconButton
                                onClick={() => handleRemoveFields(index)}
                                disabled={data.length <= 1}
                            >
                                <RemoveIcon />
                            </IconButton>
                            <IconButton onClick={handleAddFields}>
                                <AddIcon />
                            </IconButton>
                        </Box>
                    </Box>
                ))}
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
                <Button
                    onClick={() => onClose(false)}
                    variant="outlined"
                    color="inherit"
                    disabled={loading}
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={loading}
                    startIcon={loading && <CircularProgress size={20} />}
                >
                    {loading ? "Saving..." : "Save Exam Schema"}
                </Button>
            </DialogActions>

        </Dialog>
    );
};

export default ExamCreateDialog;
