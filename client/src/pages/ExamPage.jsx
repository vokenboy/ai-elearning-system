import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ExamSidebar from "../components/ExamPage/ExamSidebar";
import QuestionContent from "../components/ExamPage/QuestionContent";
import { getContentByCourseId } from "../api/content/contentAPI";
import { getCourseById } from "../api/course/courseAPI";
import { getExamByCourseId } from "../api/exam/examAPI";
import { generateExamQuestion, addExamWithAnswers } from "../api/exam/examContentAPI";
import { evaluateAnswers } from "../context/examContext";

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

                    const initialAnswers = {};
                    generated_questions.questions.forEach(q => {
                        initialAnswers[q.id] = [];
                    });
                    setUserAnswers(initialAnswers);

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
        const feedback = await evaluateAnswers({
            questions: exam.questions,
            user_answers: Object.entries(userAnswers).map(([id, answers]) => ({
                id: Number(id),
                answers: Array.isArray(answers) ? answers : [answers],
            })),
        });

        const examItem = {
            courseId: courseId,
            userId: null,
            topic: course.title,
            questions: exam.questions,
            user_answers: feedback.user_answers,
            final_score: feedback.final_score,
        }

        try {
            await addExamWithAnswers(examItem);
            console.log("Exam saved successfully");
            navigate(`/courses/${courseId}/examResults`,
                {
                    state: {
                        questions: exam.questions,
                        user_answers: feedback.user_answers,
                        final_score: feedback.final_score,
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
            <div className="flex flex-col items-center justify-center h-screen space-y-6 bg-white">

                <div className="w-10 h-10 border-4 border-gray-500 border-t-transparent rounded-full animate-spin" />

                <p className="text-lg font-semibold text-gray-700 text-center">
                    Preparing your exam... This won't take long!
                </p>
            </div>


        );
    }
    if (error) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-red-600 font-semibold">{error}</p>
            </div>
        );
    }

    const selectedQuestion =
        exam.questions.find((q) => q.id === selectedId) ?? null;

    return (
        <div className="flex flex-row-reverse h-screen bg-white font-sans">
            <div className="navbar bg-base-200 fixed shadow-md h-24 top-0 z-70 px-4 w-full">
                <label className="text-gray-900 font-semibold text-xl">
                    {course?.title} Exam
                </label>
            </div>
            <ExamSidebar
                questions={exam.questions}
                userAnswers={userAnswers}
                selectedId={selectedId}
                onSelect={setSelectedId}
                onSubmit={handleSubmit}
            />
            <div className="flex-grow p-4">
                {selectedQuestion ? (
                    <QuestionContent
                        question={selectedQuestion}
                        answer={userAnswers[selectedQuestion.id]}
                        onChange={handleChange}
                    />
                ) : (
                    <div variant="body1">
                        Please select a question.
                    </div>
                )}
            </div>
        </div>
    );
};

export default ExamPage;
