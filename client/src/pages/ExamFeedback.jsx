import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { evaluateExamAnswers } from "../api/exam/examContentAPI";
import { getCourseById } from "../api/course/courseAPI";
import EvaluationCard from "../components/ExamPage/EvaluationCard";

const ExamFeedbackPage = () => {

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
            <div className="flex flex-col items-center justify-center h-screen space-y-6 bg-white">

                <div className="w-10 h-10 border-4 border-gray-500 border-t-transparent rounded-full animate-spin" />

                <p className="text-lg font-semibold text-gray-700 text-center">
                    Preparing your score...
                </p>
            </div>
        );
    }
    const percentage = examResults?.total_points
        ? (examResults.final_score / examResults.total_points) * 100
        : 0;
    return (
        <div className="flex flex-col min-h-screen p-6 pt-26 font-sans">
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
                        {`${examResults?.final_score} / ${examResults?.total_points}`}
                    </div>
                </div>
            </div>


            <h2 className="text-md font-bold mb-2 mt-4">
                Overall feedback:
            </h2>
            <div className="max-w-4xl pb-6">
                <ReactMarkdown>{examResults?.improvements}</ReactMarkdown>
            </div>
            <div className="flex flex-wrap justify-start gap-6 max-w-full">
                {examResults?.evaluation?.map((item, index) => (
                    <div
                        key={index}
                        className="flex-1 min-w-[550px] max-w-[900px]"
                    >
                        <EvaluationCard
                            index={index}
                            evaluation={item}
                            question={questions[index]}
                            userAnswer={userAnswers[index + 1]}
                        />
                    </div>
                ))}
            </div>
            <div className="flex justify-end mt-10">
                <button
                    onClick={() => navigate(`/courses/${courseId}/content`)}
                    className="bg-primary text-base px-6 py-2 rounded-lg hover:bg-teal-600 transition"
                >
                    Go back to course
                </button>
            </div>
        </div>
    );
}

export default ExamFeedbackPage;
