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
import { getCourseById, updateCourse } from "../api/course/courseAPI";

const CourseEdit = ({ open, onClose, courseId }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (open && courseId) {
            fetchCourseData();
        }
    }, [open, courseId]);

    const fetchCourseData = async () => {
        setLoading(true);
        setError("");

        try {
            const courseData = await getCourseById(courseId);
            setTitle(courseData.title || "");
            setDescription(courseData.description || "");
            setDifficulty(courseData.difficulty || "");
        } catch (err) {
            console.error("Error fetching course:", err);
            setError("Failed to load course data. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);

        const updatedCourse = {
            title,
            description,
            difficulty,
        };

        console.log("Updating course:", updatedCourse);

        try {
            await updateCourse(courseId, updatedCourse);
            setSuccess("Course updated successfully");
            console.log("Course update successful");

            setTimeout(() => {
                onClose(true);
            }, 1000);
        } catch (err) {
            setError(err.message || "Failed to update course");
            console.error("Course update error:", err);
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
            <DialogTitle>Edit Course</DialogTitle>
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
                    placeholder="Course title"
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
                    placeholder="Course description"
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
                    <InputLabel id="edit-select-difficulty-field">
                        Difficulty
                    </InputLabel>
                    <Select
                        labelId="edit-select-difficulty-field"
                        id="edit-select-difficulty"
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
                    {loading ? "Saving..." : "Save Changes"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CourseEdit;
