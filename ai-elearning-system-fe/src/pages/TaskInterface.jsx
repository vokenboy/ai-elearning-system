import { useLocation } from "react-router-dom";
import { useState } from "react";
import { Box, Typography, Paper, Button, Divider, Stack } from "@mui/material";
import CodeEditor from "../components/CodeEditor";
import AIFeedback from "../components/AiFeedback";

const TaskInterface = () => {
    const location = useLocation();
    const { taskData, topic } = location.state || {};

    const [code, setCode] = useState("");
    const [feedback, setFeedback] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!taskData) {
        return (
            <Box sx={{ mt: 10 }}>
                <Typography variant="h6" color="error">
                    No task data available.
                </Typography>
            </Box>
        );
    }

    // const handleSubmitCode = () => {
    //     setIsSubmitting(true);
    //     setTimeout(() => {
    //         setFeedback(
    //             "Great job! The logic works well. You could add more input validation or handle edge cases for bonus points."
    //         );
    //         setIsSubmitting(false);
    //     }, 1500);
    // };

    return (
        <Paper
            elevation={3}
            sx={{
                height: "100vh",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Box
                sx={{ p: 2, borderBottom: "1px solid", borderColor: "divider" }}
            >
                <Typography variant="h5" fontWeight="bold">
                    {topic || "Programming Task"}
                </Typography>
            </Box>
            <Box sx={{ flexGrow: 1, display: "flex" }}>
                <Box
                    sx={{
                        width: "30%",
                        p: 3,
                        borderRight: "1px solid",
                        borderColor: "divider",
                        display: "flex",
                        flexDirection: "column",
                        overflow: "hidden",
                    }}
                >
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                        Task
                    </Typography>
                    <Typography variant="body1">{taskData.task}</Typography>
                </Box>
                <Box
                    sx={{
                        width: "70%",
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                    }}
                >
                    <Box
                        sx={{
                            p: 2,
                            borderBottom: "1px solid",
                            borderColor: "divider",
                        }}
                    >
                        <Stack direction="row" spacing={2}>
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={() =>
                                    console.log("Test solution logic here")
                                }
                                size="medium"
                            >
                                Test Solution
                            </Button>
                            <Button
                                variant="contained"
                                // onClick={handleSubmitCode}
                                disabled={isSubmitting}
                                size="medium"
                            >
                                {isSubmitting
                                    ? "Submitting..."
                                    : "Submit Solution"}
                            </Button>
                        </Stack>
                    </Box>
                    <Box
                        sx={{
                            flexGrow: 1,
                            overflow: "auto",
                            p: 2,
                            minHeight: 0,
                        }}
                    >
                        <CodeEditor code={code} setCode={setCode} />
                    </Box>
                    {feedback && (
                        <Box
                            sx={{
                                p: 2,
                                borderTop: "1px solid",
                                borderColor: "divider",
                            }}
                        >
                            <Typography
                                variant="subtitle1"
                                fontWeight="bold"
                                gutterBottom
                            >
                                Feedback
                            </Typography>
                            <Paper elevation={1} sx={{ p: 2 }}>
                                <AIFeedback feedback={feedback} />
                            </Paper>
                        </Box>
                    )}
                </Box>
            </Box>
        </Paper>
    );
};

export default TaskInterface;
