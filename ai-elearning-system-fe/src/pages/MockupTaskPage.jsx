import { useState } from "react";
import { Box, Container, Typography, Button, Paper } from "@mui/material";
import CodeEditor from "../components/CodeEditor";
import AIFeedback from "../components/AiFeedback";

export default function CodingInterface() {
    const [code, setCode] = useState(
        `function calculateSum(numbers) {\n  // Write your code here\n  \n}`
    );
    const [feedback, setFeedback] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmitCode = () => {
        setIsSubmitting(true);
        setTimeout(() => {
            setFeedback(
                "Your solution correctly calculates the sum of the array. Good job using the reduce method, which is an efficient approach. Consider adding input validation to handle edge cases like empty arrays or non-numeric values."
            );
            setIsSubmitting(false);
        }, 1500);
    };

    return (
        <Container maxWidth="xl" sx={{ height: "100vh", py: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Programming Exercise
            </Typography>

            <Paper
                elevation={2}
                sx={{
                    height: "calc(100% - 80px)",
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    overflow: "hidden",
                }}
            >
                <Box
                    sx={{
                        width: { xs: "100%", md: "40%" },
                        p: 3,
                        borderRight: { xs: 0, md: 1 },
                        borderBottom: { xs: 1, md: 0 },
                        borderColor: "divider",
                        overflow: "auto",
                    }}
                >
                    <Typography variant="h5" gutterBottom>
                        Array Sum Calculator
                    </Typography>

                    <Typography variant="body1" paragraph>
                        Write a function that calculates the sum of all numbers
                        in an array.
                    </Typography>

                    <Typography variant="subtitle1" fontWeight="bold">
                        Requirements:
                    </Typography>

                    <Box component="ul" sx={{ pl: 2 }}>
                        <li>
                            <Typography variant="body1">
                                The function should take an array of numbers as
                                input
                            </Typography>
                        </li>
                        <li>
                            <Typography variant="body1">
                                Return the sum of all elements in the array
                            </Typography>
                        </li>
                        <li>
                            <Typography variant="body1">
                                If the array is empty, return 0
                            </Typography>
                        </li>
                    </Box>

                    <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        sx={{ mt: 2 }}
                    >
                        Example:
                    </Typography>

                    <Box
                        component="pre"
                        sx={{
                            p: 2,
                            bgcolor: "grey.100",
                            borderRadius: 1,
                            overflow: "auto",
                        }}
                    >
                        <code>
                            {`Input: [1, 2, 3, 4, 5]
Output: 15

Input: [-1, -2, 3, 5]
Output: 5

Input: []
Output: 0`}
                        </code>
                    </Box>
                </Box>

                <Box
                    sx={{
                        width: { xs: "100%", md: "60%" },
                        display: "flex",
                        flexDirection: "column",
                        height: { xs: "calc(100% - 200px)", md: "100%" },
                    }}
                >
                    <Box sx={{ flexGrow: 1, overflow: "hidden" }}>
                        <CodeEditor code={code} setCode={setCode} />
                    </Box>

                    <Box
                        sx={{
                            p: 2,
                            borderTop: 1,
                            borderColor: "divider",
                            display: "flex",
                            justifyContent: "flex-end",
                        }}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSubmitCode}
                            disabled={isSubmitting}
                            size="large"
                        >
                            {isSubmitting ? "Submitting..." : "Submit Solution"}
                        </Button>
                    </Box>

                    {feedback && (
                        <Box
                            sx={{ p: 2, borderTop: 1, borderColor: "divider" }}
                        >
                            <Typography
                                variant="subtitle1"
                                fontWeight="bold"
                                gutterBottom
                            >
                                AI Feedback:
                            </Typography>
                            <AIFeedback feedback={feedback} />
                        </Box>
                    )}
                </Box>
            </Paper>
        </Container>
    );
}
