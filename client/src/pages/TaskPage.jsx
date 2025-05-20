import { useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import CodeEditor from "../components/TaskPage/CodeEditor";
import AIFeedback from "../components/TaskPage/AiFeedback";
import CodeOutput from "../components/TaskPage/CodeOutput";
import { evaluateTask } from "../api/task/taskAPI";
import { saveTaskSolution } from "../api/solution/solutionAPI";
import { getUserData } from "../api/user/userAPI";

const TaskPage = () => {
    const { taskData, topic } = useLocation().state || {};
    const { topicId } = useParams();

    const [code, setCode] = useState("");
    const [compileTrigger, setCompileTrigger] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [feedback, setFeedback] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [evaluation, setEvaluation] = useState(null);

    const [userId, setUserId] = useState(null);
    useEffect(() => {
        (async () => {
            try {
                const token = localStorage.getItem("jwt");
                const me = await getUserData(token);
                setUserId(me._id);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        })();
    }, []);

    if (!taskData) {
        return (
            <div className="mt-10">
                <p className="text-error text-lg font-semibold">
                    No task data available.
                </p>
            </div>
        );
    }

    const handleCompileCode = () => {
        setCompileTrigger((prev) => prev + 1);
    };

    const handleSubmitCode = async () => {
        setIsSubmitting(true);
        setEvaluation(null);
        let result;
        try {
            result = await evaluateTask({
                task: taskData.task,
                solution: taskData.solution,
                user_solution: code,
            });
            setFeedback(result.feedback || "No feedback received.");
            setEvaluation(result.evaluation ?? null);
        } catch (err) {
            console.error("Error evaluating solution:", err);
            setFeedback("Something went wrong while evaluating your solution.");
            setIsSubmitting(false);
            return;
        }
        if (!userId) {
            setFeedback("You must be logged in to save a solution.");
            setIsSubmitting(false);
            return;
        }
        try {
            await saveTaskSolution({
                userId,
                contentId: topicId,
                task: taskData.task,
                feedback: result.feedback,
                evaluation: result.evaluation,
            });
        } catch (err) {
            console.error("Error saving solution:", err);
            setFeedback("Failed to save your solution to the server.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <div className="p-4 border-b">
                <h2 className="text-2xl font-bold">
                    {topic || "Programming Task"}
                </h2>
            </div>
            <div className="flex flex-grow">
                <aside className="w-3/10 p-4 border-r flex flex-col overflow-hidden">
                    <h3 className="text-xl font-bold mb-2">Task</h3>
                    <p>{taskData.task}</p>
                </aside>
                <main className="w-7/10 flex flex-col h-full">
                    <div className="p-4 flex gap-3">
                        <button
                            className={`btn btn-outline btn-secondary ${
                                isLoading ? "loading" : ""
                            }`}
                            onClick={handleCompileCode}
                            disabled={isLoading}
                        >
                            {isLoading ? "Testing..." : "Test Solution"}
                        </button>
                        <button
                            className={`btn btn-primary ${
                                isSubmitting ? "loading" : ""
                            }`}
                            onClick={handleSubmitCode}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Submitting..." : "Submit Solution"}
                        </button>
                    </div>
                    <div className="flex-grow overflow-auto min-h-0">
                        {feedback && (
                            <section className="p-4">
                                <h3 className="text-lg font-bold mb-2">
                                    Feedback
                                </h3>
                                <AIFeedback feedback={feedback} />
                                {evaluation !== null && (
                                    <div className="card bg-base-200 p-4 mt-2">
                                        <p>
                                            <strong>Score:</strong> {evaluation}{" "}
                                            / 100
                                        </p>
                                    </div>
                                )}
                            </section>
                        )}
                        <div className="h-[60vh] overflow-hidden">
                            <CodeEditor code={code} setCode={setCode} />
                        </div>
                        <div className="overflow-hidden">
                            <CodeOutput
                                compileTrigger={compileTrigger}
                                code={code}
                                setIsLoading={setIsLoading}
                            />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default TaskPage;
