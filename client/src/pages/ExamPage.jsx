import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ExamSidebar from "../components/ExamPage/ExamSidebar";
import QuestionContent from "../components/ExamPage/QuestionContent";
import { getContentByCourseId } from "../api/content/contentAPI";
import { getCourseById } from "../api/course/courseAPI";
import { getExamByCourseId } from "../api/exam/examAPI";
import { generateExamQuestion, addExamWithAnswers } from "../api/exam/examContentAPI";

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
    const navigate = useNavigate();
    const hasFetchedRef = useRef(false);

    const [exam, setExam] = useState(null);
    const [course, setCourse] = useState(null);
    const [userAnswers, setUserAnswers] = useState({});

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedId, setSelectedId] = useState(null);


    useEffect(() => {
        const fetchExam = async () => {
            if (hasFetchedRef.current) return;
            hasFetchedRef.current = true;

            setLoading(true);
            try {
                const { examSchema, courseData, topics } = await loadData(courseId);
                setCourse(courseData);

                const generated_questions = await generateExamQuestions(examSchema, courseData, topics);

                if (generated_questions?.questions?.length > 0) {
                    setExam(generated_questions);
                    setSelectedId(generated_questions.questions[0]?.id || null);
                } else {
                    throw new Error("No questions generated.");
                }

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

    const loadData = async (courseId) => {
        try {
            const examSchema = await getExamByCourseId(courseId);
            const courseData = await getCourseById(courseId);
            const topics = await getContentByCourseId(courseId);
            return { examSchema, courseData, topics };
        } catch (err) {
            throw new Error("Failed to load data");
        }
    };

    const generateExamQuestions = async (examSchema, course, topics) => {
        const generated_questions = await generateExamQuestion({
            topics: topics,
            level: course.difficulty,
            questions_schema: examSchema.questions_schema,
        });

        if (!generated_questions || !generated_questions.questions) {
            throw new Error("Invalid exam data or missing questions.");
        }

        return generated_questions;
    };
    const handleChange = (id, value) => {
        setUserAnswers((prev) => ({ ...prev, [id]: value }));
    };


    const handleSubmit = async () => {
        const examItem = {
            courseId: courseId,
            userId: null,
            topic: course.title,
            questions: exam.questions,
            user_answers: userAnswers,
        }

        try {
            await addExamWithAnswers(examItem);
            console.log("Exam saved successfully");
            navigate(`/courses/${courseId}/examResults`,
                {
                    state: {
                        questions: exam.questions,
                        user_answers: userAnswers
                    }
                }
            );
        } catch (err) {
            setError(err.message || "Failed to save exam");
            console.error("Exam saving error:", err);
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                    gap: 3,
                }}
            >
                <CircularProgress size={50} sx={{ color: "#1976d2" }} />
                <Typography
                    variant="h6"
                    sx={{
                        mt: 2,
                        fontWeight: "bold",
                        color: "#333",
                        fontSize: "1.2rem",
                        letterSpacing: "0.5px",
                    }}
                >
                    Preparing your exam... This won't take long!
                </Typography>
            </Box>
        );
    }

    if (loading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                    gap: 3,
                }}
            >
                <CircularProgress size={50} sx={{ color: "#1976d2" }} />
                <Typography
                    variant="h6"
                    sx={{
                        mt: 2,
                        fontWeight: "bold",
                        color: "#333",
                        fontSize: "1.2rem",
                        letterSpacing: "0.5px",
                    }}
                >
                    Preparing your exam... This won't take long!
                </Typography>
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
                        {course?.title}
                    </Typography>
                </Toolbar>
            </AppBar>

            <ExamSidebar
                questions={exam.questions}
                userAnswers={userAnswers}
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
                        answer={userAnswers[selectedQuestion.id]}
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
