import { useEffect, useState } from "react";
import {
    Container,
    Box,
    Grid,
    Typography,
    TextField,
    InputLabel,
    FormControl,
    FormControlLabel,
    Select,
    MenuItem,
    Button,
    CardContent,
    Card,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
} from "@mui/material";
import { saveCourse } from "../components/saveCourse";


const CourseView = () => {
    const [courses, setCourses] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [open, setOpen] = useState(false);
    
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        fetch("http://localhost:5000/api/courses")
            .then((res) => res.json())
            .then((data) => setCourses(data))
            .catch((err) => console.error("Error fetching courses:", err));
    }, []);

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

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
    
    return (
        <Container sx={{ mt: 5 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Course List
            </Typography>

                <Grid item xl={6} md={6} sm={12} xs={12}>
                    <Button variant="contained" onClick={handleClickOpen}>
                        Create Course
                    </Button>
                </Grid>
                <Dialog onClose={handleClose} open={open}> 
                    <DialogTitle>Create Course</DialogTitle>
                    <DialogContent>
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
                            <InputLabel id="select-difficulty-field">Difficulty</InputLabel>
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
                        <Button onClick={handleClose} variant="contained">Cancel</Button>
                        <Button type="submit" onClick={handleSave} variant="contained">Create</Button>
                    </DialogActions>
                </Dialog>
                
            <Grid container spacing={6} justifyContent="center"> 
                {courses.map((course) => (
                    <Grid item key={course._id} xs={12} sm={6} md={4} lg={3}>
                        <Card
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                height: "100%",
                                minHeight: 250,
                                p: 2,
                                boxShadow: 3,
                            }}
                        >
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography variant="h6">{course.title}</Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {course.description}
                                </Typography>
                                <Typography variant="body2" sx={{ mt: 1 }}>
                                    <strong>Difficulty:</strong> {course.difficulty}
                                </Typography>
                                <Typography variant="body2">
                                    <strong>Created at:</strong> {new Date(course.createdAt).toLocaleDateString()}
                                </Typography>
                            </CardContent>
                            <Button
                                variant="contained"
                                sx={{ mt: "auto", alignSelf: "center" }} 
                            >
                                View Course
                            </Button>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default CourseView;
