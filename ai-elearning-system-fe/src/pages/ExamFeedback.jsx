import { useState, useEffect, useRef } from "react";
import {
    Box,
    AppBar,
    Toolbar,
    Typography,
    CssBaseline,
    CircularProgress,
} from "@mui/material";
import { useParams, useLocation } from "react-router-dom";
import { evaluateExamAnswers } from "../api/exam/exam_contentAPI";
import { getContentByCourseId } from "../api/content/contentAPI";
import { getCourseById } from "../api/course/courseAPI";

const ExamFeedback = () => {

    const { courseId } = useParams();
    const location = useLocation();
    const hasFetchedRef = useRef(false);

    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [finalFeedback, setFinalFeedback] = useState({});

    useEffect(() => {
        loadFeedback();

    }, []);

    const loadFeedback = async () => {
        if (hasFetchedRef.current) return;
        hasFetchedRef.current = true;

        setLoading(true)
        try {
            const feedback = await EvaluateExamAnswers();
            const courseData = await getCourseById(courseId);
            setCourse(courseData);

            if (feedback && feedback.feedback?.length > 0) {
                console.log("feedback: ", feedback);
                setFinalFeedback(feedback)
            } else {
                throw new Error("No feedback generated.");
            }

        } catch (err) {
            console.error(`Error returning feedback ${courseId}:`, err);
            setError("Failed to return feedback. Please try again.");
            navigate(`/courses/${courseId}/exam`);
        } finally {
            setLoading(false);
        }
    }

    const EvaluateExamAnswers = async () => {
        const feedback = await evaluateExamAnswers({
            questions: location.state.questions,
            user_answers: location.state.user_answers,
        });
        if (!feedback) {
            console.log("Failed to evaluate user answers");
            throw new Error("Failed to evaluate user answers");
        }
        return feedback;
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
                    Preparing your score...
                </Typography>
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
    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h6" gutterBottom>
                Final score: {finalFeedback?.final_score || 0}
            </Typography>

            <Typography variant="h6" gutterBottom>
                Feedback:
            </Typography>
            {finalFeedback?.feedback?.map((feedback, index) => (
                <Typography key={index} variant="body1">
                    Question {index + 1}: {feedback}
                </Typography>
            ))}

            <Typography variant="h6" gutterBottom>
                Scores:
            </Typography>
            {finalFeedback?.scores?.map((score, index) => (
                <Typography key={index} variant="body2">
                    Question {index + 1}: {score} points
                </Typography>
            ))}
        </Box>
    );
}

export default ExamFeedback;
