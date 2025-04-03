import { useState, useRef } from "react";
import { useParams } from 'react-router-dom';
import {
    TextField,
    Button,
    IconButton,
    Box,
    Chip,
    Typography,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
} from "@mui/material";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { addContent } from "../api/course/content";

const ContentCreation = ({ open, onClose, onSave}) => {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const { courseId } = useParams();
    const tagRef = useRef();

    const [inputFields, setInputFields] = useState([
        {
            topic: "",
            language: "",
            description: "",
            tags: []
        }
    ]);

    // Handle tag addition
    const handleAddTag = (index, e) => {
        e.preventDefault();
        const tagValue = tagRef.current.value.trim();
        if (!tagValue) return;

        const values = [...inputFields];
        if (!values[index].tags.includes(tagValue)) {
            values[index].tags = [...values[index].tags, tagValue];
            setInputFields(values);
        }
        tagRef.current.value = "";
    };

    // Handle tag removal
    const handleRemoveTag = (index, tagToRemove) => {
        const values = [...inputFields];
        values[index].tags = values[index].tags.filter(tag => tag !== tagToRemove);
        setInputFields(values);
    };
    // Handle content saving to course
    const handleSave = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const savePromises = inputFields.map(newContent => {
                const content = {
                    ...newContent,
                    courseId,
                    tags: Array.isArray(newContent.tags) ? newContent.tags : []
                };
                return addContent(content);
            });
            

            await Promise.all(savePromises);

            setSuccess("Content added to the course");
            console.log("Content added to the course");
            // Reset form after successful save
            setInputFields([{ topic: "", language: "", description: "", tags: [] }]);
            onSave();
        } catch (err) {
            setError(err.message || "Failed to add content to the course");
            console.error("Content failed to add:", err);
        }
    };

    // Storing values
    const handleChangeInput = (index, event) => {
        const values = [...inputFields];
        values[index][event.target.name] = event.target.value;
        setInputFields(values);
    };

    // Handle adding more topics for course
    const handleAddFields = () => {
        setInputFields([...inputFields,
        { topic: "", language: "", description: "", tags: [] }]);
    };

    // Handle removing topics for course
    const handleRemoveFields = (index) => {
        const values = [...inputFields];
        values.splice(index, 1);
        setInputFields(values);
    };

    return (
        <Dialog onClose={onClose} open={open} fullWidth maxWidth="md">
            <DialogTitle>Add content</DialogTitle>
            <DialogContent>
                {error && (
                    <Typography color="error" variant="body2" sx={{ mb: 2 }}>
                        {error}
                    </Typography>
                )}
                {success && (
                    <Typography color="success.main" variant="body2" sx={{ mb: 2 }}>
                        {success}
                    </Typography>
                )}
                {inputFields.map((inputField, index) => (
                    <Box key={index} sx={{ mb: 3, borderBottom: 1, borderColor: 'divider', pb: 2 }}>
                        <TextField
                            name="topic"
                            label="Topic"
                            type="text"
                            variant="standard"
                            fullWidth
                            required
                            margin="dense"
                            value={inputField.topic}
                            onChange={(e) => handleChangeInput(index, e)}
                        />
                        <TextField
                            name="language"
                            label="Language"
                            type="text"
                            variant="outlined"
                            fullWidth
                            required
                            margin="dense"
                            value={inputField.language}
                            onChange={(e) => handleChangeInput(index, e)}
                        />
                        <TextField
                            name="description"
                            label="Description"
                            variant="outlined"
                            type="text"
                            fullWidth
                            margin="dense"
                            required
                            value={inputField.description}
                            onChange={(e) => handleChangeInput(index, e)}
                            multiline
                        />
                        {/* Tags Section */}
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="subtitle2">Tags</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                <TextField
                                    inputRef={tagRef}
                                    variant='standard'
                                    size='small'
                                    fullWidth
                                    sx={{ margin: "1rem 0" }}
                                    placeholder={inputField.tags.length < 5 ? "Add tag..." : ""}
                                    disabled={inputField.tags.length >= 5}
                                    onKeyPress={(e) => e.key === 'Enter' && handleAddTag(index, e)}
                                />
                                <Button
                                    onClick={(e) => handleAddTag(index, e)}
                                    disabled={inputField.tags.length >= 5}
                                >
                                    Add
                                </Button>
                            </Box>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
                                {inputField.tags.map((tag, tagIndex) => (
                                    <Chip
                                        key={tagIndex}
                                        label={tag}
                                        onDelete={() => handleRemoveTag(index, tag)}
                                        size="small"
                                    />
                                ))}
                            </Box>
                            <Typography variant="caption" color="textSecondary">
                                {inputField.tags.length}/5 tags
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                            <IconButton
                                onClick={() => handleRemoveFields(index)}
                                disabled={inputFields.length <= 1}
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
            <DialogActions>
                <Button onClick={onClose} variant="outlined">Cancel</Button>
                <Button
                    onClick={handleSave}
                    variant="contained"
                    disabled={!inputFields.every(field =>
                        field.topic && field.language && field.description
                    )}
                >
                    Save Content
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ContentCreation;
