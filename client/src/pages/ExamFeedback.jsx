import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { getCourseById, getCertificate } from "../api/course/courseAPI";
import { getExamFeedback } from "../api/exam/examContentAPI";
import { calculateTotalPoints } from "../context/examContext";
import { formatScore } from "../context/examContext";
import EvaluationCard from "../components/ExamPage/EvaluationCard";

const ExamFeedbackPage = () => {
    const { courseId } = useParams();
    const location = useLocation();
    const hasFetchedRef = useRef(false);
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [course, setCourse] = useState(null);
    const [questions, setQuestions] = useState(null);
    const [userAnswers, setUserAnswers] = useState(null);
    const [feedback, setFeedback] = useState({});
    const [finalScore, setFinalScore] = useState();
    const [totalPoints, setTotalPoints] = useState();
    const [certDownloading, setCertDownloading] = useState(false);

    useEffect(() => {
        loadFeedback();
    }, []);

    const loadFeedback = async () => {
        if (hasFetchedRef.current) return;
        hasFetchedRef.current = true;

        setLoading(true);
        try {
            const courseData = await getCourseById(courseId);
            const questions = await location.state.questions;
            const user_answers = await location.state.user_answers;
            const final_score = await location.state.final_score;
            const total_points = await calculateTotalPoints(questions);

            setCourse(courseData);
            setQuestions(questions);
            setUserAnswers(user_answers);
            setFinalScore(final_score);
            setTotalPoints(total_points);

            if (questions && user_answers) {
                const results = await getExamFeedback({ questions, user_answers });
                setFeedback(results);
            } else {
                throw new Error("Missing data for evaluation.");
            }
        } catch (err) {
            console.error(`Error returning exam results ${courseId}:`, err);
            setError("Failed to return exam results. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleDownloadCertificate = async () => {
        setCertDownloading(true);
        try {
            const blob = await getCertificate(courseId);
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute(
                "download",
                `${course?.title || "certificate"}_certificate.pdf`
            );
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (downloadError) {
            console.error("Error downloading certificate:", downloadError);
        } finally {
            setCertDownloading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-screen space-y-6 bg-white">
                <div className="w-10 h-10 border-4 border-gray-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-lg font-semibold text-gray-700 text-center">
                    Preparing your score...
                </p>
            </div>
        );
    }

    const percentage = totalPoints
        ? (finalScore / totalPoints) * 100
        : 0;

    return (
        <div className="flex flex-col min-h-screen p-6 font-sans">
            <div className="w-full max-w-md mx-auto mt-3">
                <h1 className="text-3xl font-bold text-center mb-6">
                    Final Score
                </h1>
                <div className="relative h-6 rounded-full bg-base-200 overflow-hidden">
                    <div
                        style={{ width: `${percentage}%` }}
                        className={`h-full rounded-full transition-all duration-1000 ease-in-out ${percentage < 50
                            ? "bg-red-400"
                            : percentage < 80
                                ? "bg-yellow-300"
                                : "bg-teal-300"
                            }`}
                    />
                    <div className="absolute inset-0 flex items-center justify-center font-bold text-gray-800">
                        {`${formatScore(finalScore)} / ${totalPoints}`}
                    </div>
                </div>
            </div>

            <h2 className="text-md font-bold mb-2 mt-4">Overall feedback:</h2>
            <div className="max-w-4xl pb-6">
                <ReactMarkdown>{feedback?.improvements}</ReactMarkdown>
            </div>
            <div className="flex flex-wrap justify-start gap-6 max-w-full">
                {questions?.map((question, index) => {
                    const userAnswer = userAnswers?.find(answers => answers.id === question.id);
                    const evaluation = feedback?.evaluation?.[index];
                    return (
                        <div
                            key={question.id}
                            className="flex-1 min-w-[500px] max-w-[700px]"
                        >
                            <EvaluationCard
                                index={index}
                                question={question}
                                userAnswer={userAnswer}
                                evaluation={evaluation}
                            />
                        </div>
                    );
                })}
            </div>

            <div className="flex justify-end mt-10 space-x-4">
                {percentage >= 80 && (
                    <button
                        onClick={handleDownloadCertificate}
                        disabled={certDownloading}
                        className="bg-secondary text-base px-6 py-2 rounded-lg hover:bg-pink-300 transition disabled:opacity-50"
                    >
                        {certDownloading ? "Downloading..." : "Get Certificate"}
                    </button>
                )}
                <button
                    onClick={() => navigate(`/courses/${courseId}/content`)}
                    className="btn btn-primary text-base px-6 py-2 rounded-lg hover:bg-teal-600 transition"
                >
                    Go back to course
                </button>
            </div>
        </div>
    );
};

export default ExamFeedbackPage;
