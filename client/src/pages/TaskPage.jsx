import { useLocation } from "react-router-dom";
import { useState } from "react";
import CodeEditor from "../components/TaskPage/CodeEditor";
import AIFeedback from "../components/TaskPage/AiFeedback";
import CodeOutput from "../components/TaskPage/CodeOutput";
import { evaluateTask } from "../api/task/taskAPI";

const TaskPage = () => {
    const location = useLocation();
    const { taskData, topic } = location.state || {};

    const [code, setCode] = useState("");
    const [compileTrigger, setCompileTrigger] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [feedback, setFeedback] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [evaluation, setEvaluation] = useState(null);

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
        const payload = {
            task: taskData.task,
            solution: taskData.solution,
            user_solution: code,
        };
        try {
            const result = await evaluateTask(payload);
            setFeedback(result.feedback || "No feedback received.");
            setEvaluation(result.evaluation ?? null);
        } catch (error) {
            setFeedback("Something went wrong while evaluating your solution.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="">
            <div className="p-4 border-b">
                <h2 className="text-2xl font-bold">
                    {topic || "Programming Task"}
                </h2>
            </div>
            <div className="flex flex-grow">
                <div className="w-3/10 p-4 border-r flex flex-col overflow-hidden">
                    <h3 className="text-xl font-bold mb-2">Task</h3>
                    <p>{taskData.task}</p>
                </div>
                <div className="w-7/10 flex flex-col h-full">
                    <div className="p-4">
                        <div className="flex gap-3">
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
                                {isSubmitting
                                    ? "Submitting..."
                                    : "Submit Solution"}
                            </button>
                        </div>
                    </div>
                    <div className="flex-grow overflow-auto min-h-0">
                        {feedback && (
                            <div className="p-4">
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
                            </div>
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
                </div>
            </div>
        </div>
    );
};

export default TaskPage;
