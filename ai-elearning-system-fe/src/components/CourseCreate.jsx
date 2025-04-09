import { useEffect, useState } from "react";
import {
    Typography,
    TextField,
    InputLabel,
    FormControl,
    Select,
    MenuItem,
    Button,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    CircularProgress,
} from "@mui/material";
import { saveCourse } from "../api/course/courseAPI";

const CourseCreate = ({ open, onClose }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (open) {
            setTitle("");
            setDescription("");
            setDifficulty("");
            setError("");
            setSuccess("");
        }
    }, [open]);

    const handleSave = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);

        const newCourse = {
            title,
            description,
            difficulty,
        };

        console.log("Saving course:", newCourse);

        try {
            await saveCourse(newCourse);
            setSuccess("Course created successfully");
            console.log("Course creation successful");

            setTimeout(() => {
                onClose(true);
            }, 1000);
        } catch (err) {
            setError(err.message || "Failed to create course");
            console.error("Course creation error:", err);
            setLoading(false);
        }
    };

    const handleCancel = () => {
        onClose(false);
    };

    return (
        <Dialog
            onClose={() => onClose(false)}
            open={open}
            fullWidth
            maxWidth="md"
        >
            <DialogTitle>Create Course</DialogTitle>
            <DialogContent>
                {error && (
                    <Typography color="error" variant="body2" sx={{ mb: 2 }}>
                        {error}
                    </Typography>
                )}
                {success && (
                    <Typography
                        color="success.main"
                        variant="body2"
                        sx={{ mb: 2 }}
                    >
                        {success}
                    </Typography>
                )}
                <TextField
                    label="Title"
                    type="text"
                    placeholder="Add course title"
                    variant="outlined"
                    fullWidth
                    required
                    margin="dense"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    disabled={loading}
                />
                <TextField
                    label="Description"
                    variant="outlined"
                    type="text"
                    placeholder="Add description for the course"
                    fullWidth
                    margin="dense"
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    multiline
                    minRows={4}
                    disabled={loading}
                />
                <FormControl fullWidth margin="dense" disabled={loading}>
                    <InputLabel id="select-difficulty-field">
                        Difficulty
                    </InputLabel>
                    <Select
                        labelId="select-difficulty-field"
                        id="select-difficulty"
                        value={difficulty}
                        label="Difficulty"
                        onChange={(e) => setDifficulty(e.target.value)}
                    >
                        <MenuItem value={"Beginner"}>Beginner</MenuItem>
                        <MenuItem value={"Intermediate"}>Intermediate</MenuItem>
                        <MenuItem value={"Advanced"}>Advanced</MenuItem>
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleCancel}
                    variant="outlined"
                    color="inherit"
                    disabled={loading}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    onClick={handleSave}
                    variant="contained"
                    disabled={loading || !title || !description || !difficulty}
                    startIcon={loading ? <CircularProgress size={20} /> : null}
                >
                    {loading ? "Creating..." : "Create"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CourseCreate;
