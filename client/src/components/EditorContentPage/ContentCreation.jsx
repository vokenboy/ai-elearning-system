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
    Chip,
    Box,
    Typography,
    CircularProgress,
    Alert,
    Autocomplete,
} from "@mui/material";
import ReactMarkdown from "react-markdown";
import { addContent } from "../../api/content/contentAPI";

const LANGUAGES = ["javascript", "python"];

const ContentCreation = ({ open, onClose, onSave, courseId }) => {
    const [formData, setFormData] = useState({
        topic: "",
        description: "",
        language: LANGUAGES[0],
        tags: [],
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        if (open) {
            setFormData({
                topic: "",
                description: "",
                language: LANGUAGES[0],
                tags: [],
            });
            setError("");
            setSuccess("");
        }
    }, [open]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleTagChange = (event, newTags) => {
        setFormData((prev) => ({ ...prev, tags: newTags }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            await addContent({ ...formData, courseId });
            setSuccess("Topic created successfully!");
            setTimeout(() => {
                if (onSave) onSave();
                onClose(true);
            }, 1000);
        } catch (err) {
            console.error("Error creating topic:", err);
            setError(
                err.message || "Failed to create topic. Please try again."
            );
            setLoading(false);
        }
    };

    const isFormValid = () => {
        return (
            formData.topic.trim() !== "" &&
            formData.description.trim() !== "" &&
            formData.language.trim() !== ""
        );
    };

    return (
        <Dialog
            open={open}
            onClose={() => onClose(false)}
            fullWidth
            maxWidth="lg"
            PaperProps={{ sx: { borderRadius: 2 } }}
        >
            <DialogTitle>
                <Typography variant="h6">Add Topic</Typography>
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

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        gap: 2,
                    }}
                >
                    <Box sx={{ flex: 1 }}>
                        <TextField
                            fullWidth
                            label="Topic Title"
                            name="topic"
                            value={formData.topic}
                            onChange={handleChange}
                            margin="normal"
                            required
                            disabled={loading}
                        />

                        <TextField
                            fullWidth
                            label="Description (Markdown)"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            margin="normal"
                            required
                            multiline
                            rows={24}
                            disabled={loading}
                            sx={{
                                "& .MuiInputBase-input": {
                                    scrollbarWidth: "none",
                                    msOverflowStyle: "none",
                                    "&::-webkit-scrollbar": {
                                        display: "none",
                                    },
                                    fontFamily: "monospace",
                                    fontSize: 14,
                                },
                            }}
                        />

                        <FormControl
                            fullWidth
                            margin="normal"
                            required
                            disabled={loading}
                        >
                            <InputLabel>Programming Language</InputLabel>
                            <Select
                                name="language"
                                value={formData.language}
                                onChange={handleChange}
                                label="Programming Language"
                            >
                                {LANGUAGES.map((lang) => (
                                    <MenuItem key={lang} value={lang}>
                                        {lang}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <Box sx={{ mt: 2 }}>
                            <Autocomplete
                                multiple
                                freeSolo
                                options={[]}
                                value={formData.tags}
                                onChange={handleTagChange}
                                renderTags={(value, getTagProps) =>
                                    value.map((option, index) => (
                                        <Chip
                                            key={index}
                                            label={option}
                                            {...getTagProps({ index })}
                                            disabled={loading}
                                        />
                                    ))
                                }
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Tags"
                                        disabled={loading}
                                    />
                                )}
                            />
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            flex: 1,
                            p: 2,
                            border: "1px solid #ccc",
                            borderRadius: 1,
                            minHeight: 800,
                            maxHeight: 800,
                            overflowY: "auto",
                            scrollbarWidth: "none",
                            msOverflowStyle: "none",
                            "&::-webkit-scrollbar": {
                                display: "none",
                            },
                        }}
                    >
                        <Typography variant="subtitle1" gutterBottom>
                            Description Preview
                        </Typography>
                        <ReactMarkdown>{formData.description}</ReactMarkdown>
                    </Box>
                </Box>
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
                    disabled={loading || !isFormValid()}
                    startIcon={loading && <CircularProgress size={20} />}
                >
                    {loading ? "Saving..." : "Save Topic"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ContentCreation;
