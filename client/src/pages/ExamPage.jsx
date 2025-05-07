import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getExamByCourseId } from "../api/exam/examAPI";
import ExamSidebar from "../components/ExamPage/ExamSidebar";
import QuestionContent from "../components/ExamPage/QuestionContent";

import {
    Box,
    AppBar,
    Toolbar,
    Typography,
    CssBaseline,
    CircularProgress,
} from "@mui/material";

const ExamPage = () => {
    const { courseId } = useParams();

    const [exam, setExam] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedId, setSelectedId] = useState(null);
    const [answers, setAnswers] = useState({});

    useEffect(() => {
        const fetchExam = async () => {
            setLoading(true);
            try {
                const raw = await getExamByCourseId(courseId);
                const data = Array.isArray(raw) ? raw[0] : raw;
                if (!data?.questions || !Array.isArray(data.questions)) {
                    throw new Error("Invalid exam data");
                }
                setExam(data);
                setSelectedId(data.questions[0]?.id ?? null);
            } catch (err) {
                console.error(`Error loading exam ${courseId}:`, err);
                setError("Failed to load exam.");
            } finally {
                setLoading(false);
            }
        };

        if (courseId) {
            fetchExam();
        } else {
            setError("No course ID provided.");
            setLoading(false);
        }
    }, [courseId]);

    const handleChange = (id, value) => {
        setAnswers((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = () => {
        console.log("Submitted answers:", answers);
        // TODO siusti atsakymus i srv
    };

    if (loading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <Typography color="error">{error}</Typography>
            </Box>
        );
    }

    const selectedQuestion =
        exam.questions.find((q) => q.id === selectedId) ?? null;

    return (
        <Box sx={{ display: "flex", height: "100vh" }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap>
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

export default ExamPage;
