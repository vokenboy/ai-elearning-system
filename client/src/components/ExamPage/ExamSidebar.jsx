import { useState } from "react";
import { FiAlignJustify } from "react-icons/fi";

const ExamSidebar = ({
    questions,
    userAnswers,
    selectedId,
    onSelect,
    onSubmit,
}) => {
    const [open, setOpen] = useState(true);

    const toggleSidebar = () => setOpen(!open);

    return (
        <>

            <div
                className={`fixed top-0 right-0 h-full pt-10 bg-white shadow-lg transform transition-transform duration-300 ease-in-out 
                ${open ? "translate-x-0" : "translate-x-full"} min-w-60 max-sm:w-46 `}
            >
                <button
                    onClick={toggleSidebar}
                    className="fixed top-30 right-60 z-90 w-10 h-10 flex items-center justify-center bg-white rounded-l-full shadow-md"
                >
                    <FiAlignJustify />
                </button>
                <div className="p-4 pt-20 h-full flex flex-col justify-between">
                    <nav className="flex-1 pt-1 overflow-y-auto">
                        <ul className="space-y-1">
                            {questions.map((q) => {
                                const answer = userAnswers[q.id];

                                const isSelected = q.id === selectedId;
                                const isAnswered =
                                    q.type === "multiSelect"
                                        ? Array.isArray(answer) && answer.length > 0
                                        : Boolean(answer && answer.toString().trim() !== "");

                                return (
                                    <li key={q.id}>
                                        <button
                                            onClick={() => onSelect(q.id)}
                                            className={`btn btn-ghost w-full rounded-md transition
                                        ${isSelected
                                                    ? "bg-base-200 font-semibold text-base-content border-base-300"
                                                    : "bg-base-100 hover:bg-base-200 text-base-content border-base-200"
                                                }`}
                                        >

                                            {isAnswered ? (
                                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary">
                                                    <svg
                                                        className="w-4 h-4 text-primary-content"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth={2}
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M5 13l4 4L19 7"
                                                        />
                                                    </svg>
                                                </span>
                                            ) : (
                                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-base-300">
                                                    <svg
                                                        className="w-4 h-4 text-secondary-content"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                    />
                                                </span>
                                            )}
                                            <span className="px-2">
                                                Question {q.id}
                                            </span>
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>

                    <div className="p-4">
                        <button
                            onClick={onSubmit}
                            className="btn btn-primary w-full rounded-md bg-teal-100 hover:bg-teal-300"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ExamSidebar;
