import { useState } from "react";
import { Box, AppBar, Toolbar, Typography, CssBaseline } from "@mui/material";
import ExamSidebar from "../components/ExamSidebar";
import QuestionContent from "../components/QuestionContent";

const exam = {
    topic: "JavaScript Introduction",
    questions: [
        { id: 1, text: "What is JavaScript?", score: 5, type: "open" },
        {
            id: 2,
            text: "Which of the following are primitive data types in JavaScript?",
            score: 5,
            type: "multiSelect",
            options: ["String", "Number", "Boolean", "Object", "Undefined"],
        },
        {
            id: 3,
            text: "What does ‘===’ operator compare?",
            score: 5,
            type: "singleSelect",
            options: [
                "Value only",
                "Type only",
                "Value and type",
                "Memory reference",
            ],
        },
        {
            id: 4,
            text: "Explain the difference between var, let, and const.",
            score: 10,
            type: "open",
        },
        {
            id: 5,
            text: "Which array methods modify the original array?",
            score: 5,
            type: "multiSelect",
            options: ["map", "filter", "push", "pop", "slice"],
        },
        {
            id: 6,
            text: "What is the scope of a variable declared with let inside a block?",
            score: 5,
            type: "singleSelect",
            options: [
                "Function scope",
                "Global scope",
                "Block scope",
                "Module scope",
            ],
        },
        {
            id: 7,
            text: "Describe what a callback function is.",
            score: 5,
            type: "open",
        },
        {
            id: 8,
            text: "Which of these are falsy values in JavaScript?",
            score: 5,
            type: "multiSelect",
            options: ["0", "NaN", "'false'", "undefined", "null"],
        },
        {
            id: 9,
            text: "What will console.log(typeof NaN) output?",
            score: 5,
            type: "singleSelect",
            options: ["number", "NaN", "undefined", "object"],
        },
        {
            id: 10,
            text: "How do you convert a string '123' to a number in JavaScript?",
            score: 5,
            type: "open",
        },
    ],
};

const Exam = () => {
    const [selectedId, setSelectedId] = useState(exam.questions[0]?.id || null);
    const [answers, setAnswers] = useState({});

    const selectedQuestion = exam.questions.find((q) => q.id === selectedId);

    const handleChange = (id, value) => {
        setAnswers((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = () => {
        console.log("Submitted answers:", answers);
        // TODO API Call
    };

    return (
        <Box sx={{ display: "flex", height: "100vh" }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        {exam.topic}
                    </Typography>
                </Toolbar>
            </AppBar>

            <ExamSidebar
                questions={exam.questions}
                answers={answers}
                selectedId={selectedId}
                onSelect={setSelectedId}
                onSubmit={handleSubmit}
            />

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    bgcolor: "background.paper",
                    p: 4,
                    overflow: "auto",
                }}
            >
                <Toolbar />
                {selectedQuestion ? (
                    <QuestionContent
                        question={selectedQuestion}
                        answer={answers[selectedQuestion.id]}
                        onChange={handleChange}
                    />
                ) : (
                    <Typography variant="body1">
                        Please select a question.
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

export default Exam;
