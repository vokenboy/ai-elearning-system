import { useEffect, useState } from "react";
import {
    Grid,
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
} from "@mui/material";
import { saveCourse } from "../../api/course/courseAPI";

const CourseCreation = ({ open, onClose }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [difficulty, setDifficulty] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSave = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        const newCourse = {
            title,
            description,
            difficulty,
        };

        console.log("Saving course:", newCourse);

        try {
            const response = await saveCourse(newCourse);
            setSuccess("Course created successfully");
            console.log("Course creation successful", response);
            handleClose();
        } catch (err) {
            setError(err.message);
            console.error("Course creation error:", err);
        }
    };
    const handleChange = (event) => {
        setDifficulty(event.target.value);
    };
    return (
        <Dialog onClose={onClose} open={open} fullWidth maxWidth="md">
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
                />
                <FormControl fullWidth margin="dense">
                    <InputLabel id="select-difficulty-field">
                        Difficulty
                    </InputLabel>
                    <Select
                        labelId="select-difficulty-field"
                        id="select-difficulty"
                        value={difficulty}
                        label="Difficulty"
                        onChange={handleChange}
                    >
                        <MenuItem value={"Beginner"}>Beginner</MenuItem>
                        <MenuItem value={"Intermediate"}>Intermediate</MenuItem>
                        <MenuItem value={"Advanced"}>Advanced</MenuItem>
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} variant="contained">
                    Cancel
                </Button>
                <Button
                    type="submit"
                    onClick={handleSave}
                    variant="contained"
                    disabled={!title || !description || !difficulty}
                >
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CourseCreation;
