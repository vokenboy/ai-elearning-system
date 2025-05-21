const ExamSidebar = ({
    questions,
    userAnswers,
    selectedId,
    onSelect,
    onSubmit,
}) => (
    <div className="flex flex-col w-60 p-2 px-5 h-screen bg-white shadow-lg flex-shrink-0">
        <div className="h-20" />
        <nav className="flex-1 pt-1 overflow-y-auto ">
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
                                className={`flex items-center justify-left w-full px-2 py-2 rounded-md border text-left transition
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
                className="w-full bg-teal-100 font-bold text-primary-content py-2 border border-primary rounded-lg hover:transition hover:bg-primary"
            >
                Submit
            </button>
        </div>
    </div>
);

export default ExamSidebar;
