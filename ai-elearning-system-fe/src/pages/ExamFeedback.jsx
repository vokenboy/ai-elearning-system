import { useState, useEffect, useRef } from "react";
import {
    Box,
    Card,
    CardContent,
    Button,
    Typography,
    CircularProgress,
} from "@mui/material";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { evaluateExamAnswers } from "../api/exam/exam_contentAPI";
import { getCourseById } from "../api/course/courseAPI";
import EvaluationCard from "../components/EvaluationCard";

const ExamFeedback = () => {

    const { courseId } = useParams();
    const location = useLocation();
    const hasFetchedRef = useRef(false);
    const navigate = useNavigate();

    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [examResults, setExamResults] = useState({});
    const [questions, setQuestions] = useState(null);
    const [userAnswers, setUserAnswers] = useState(null);

    useEffect(() => {
        loadFeedback();

    }, []);

    const loadFeedback = async () => {
        if (hasFetchedRef.current) return;
        hasFetchedRef.current = true;

        setLoading(true)
        try {
            const results = await EvaluateExamAnswers();
            const courseData = await getCourseById(courseId);
            setCourse(courseData);
            setQuestions(location.state.questions)
            setUserAnswers(location.state.user_answers)

            if (results && results.evaluation?.length > 0) {
                setExamResults(results)
            } else {
                throw new Error("No exam results generated.");
            }

        } catch (err) {
            console.error(`Error returning exam results ${courseId}:`, err);
            setError("Failed to return exam results. Please try again.");
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
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            p: 4,
        }}>
            <Box sx={{ width: "100%", maxWidth: 400, mx: "auto", mt: 3 }}>
                <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
                    Final Score
                </Typography>
                <Box
                    sx={{
                        position: "relative",
                        height: 40,
                        borderRadius: 20,
                        backgroundColor: "#e0e0e0",
                        overflow: "hidden",
                    }}
                >
                    <Box
                        sx={{
                            width: `${examResults?.final_score}%`,
                            height: "100%",
                            bgcolor:
                                examResults?.final_score < 5
                                    ? "#d32f2f"
                                    : examResults?.final_score < 8
                                        ? "#fbc02d"
                                        : "#388e3c",
                            borderRadius: 20,
                            transition: "width 3s ease-in-out",
                        }}
                    />
                    <Typography
                        variant="h5"
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            fontWeight: "bold",
                            color: 'text.primary',
                        }}
                    >
                        {`${examResults?.final_score}% / 100%`}
                    </Typography>
                </Box>
            </Box>


            <Typography variant="h6" gutterBottom sx={{fontWeight: 'bold'}}>
                Overall feedback:
            </Typography>
            <Typography variant="captions" gutterBottom>
                {examResults?.improvements}
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "flex-start",
                    gap: 2,
                    maxWidth: "100%",
                }}
            >
                {examResults?.evaluation?.map((item, index) => (
                    <Box
                        key={index}
                        sx={{
                            flex: "1 1 320px",
                            maxWidth: 900,
                            minWidth: 550,
                            display: "flex",
                        }}
                    >
                        <EvaluationCard
                            index={index}
                            evaluation={item}
                            question={questions[index]}
                            userAnswer={userAnswers[index+1]}
                        />
                    </Box>
                ))}
            </Box>
            <Box sx={{ flexGrow: 1 }} />

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => navigate(`/courses/${courseId}/content`)}
                >
                    Go back to course
                </Button>
            </Box>
        </Box>
    );
}

export default ExamFeedback;
