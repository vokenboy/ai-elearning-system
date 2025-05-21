
const QuestionContent = ({
    question,
    answer = question.question_type === "multiple select" ? [] : "",
    onChange,
}) => {
    const renderInput = () => {
        switch (question.question_type) {
            case "open":
                return (
                    <div className="pt-6">
                        <input
                            type="text"
                            id="answer"
                            value={answer}
                            onChange={(e) => onChange(question.id, e.target.value)}
                            className="h-20 border border-gray-300 text-gray-900 text-base rounded-lg w-full p-4 focus:outline-none focus:ring-2 focus:ring-gray-300"
                            placeholder="Type your answer here..."
                        />
                    </div>
                );
            case "single select":
                return (
                    <div className="grid gap-4 mt-4 mb-4">
                        {question.options.map((opt, idx) => {
                            const selected = answer === opt;
                            return (
                                <label
                                    key={idx}
                                    htmlFor={`option-${question.id}-${idx}`}
                                    className={`block p-4 border rounded-xl cursor-pointer text-base transition-all
                                            ${selected ? 'border-gray-500 bg-gray-50 text-gray-700' : 'border-gray-300 hover:border-gray-400'}`}
                                >
                                    <input
                                        type="radio"
                                        id={`option-${question.id}-${idx}`}
                                        name={`question-${question.id}`}
                                        value={opt}
                                        checked={selected}
                                        onChange={(e) => onChange(question.id, e.target.value)}
                                        className="hidden"
                                    />
                                    {opt}
                                </label>
                            );
                        })}
                    </div>
                );
            case "multiple select":
                return (
                    <div className="grid gap-4 mb-4">
                        <p className="text-sm text-gray-500 italic mt-2">
                            Select multiple options
                        </p>
                        {question.options.map((opt, idx) => {
                            const selected = answer.includes(opt);
                            return (
                                <label
                                    key={idx}
                                    htmlFor={`option-${question.id}-${idx}`}
                                    className={`block p-4 border rounded-xl cursor-pointer text-base transition-all
                                            ${answer.includes(opt) ? 'border-gray-500 bg-gray-50' : 'border-gray-300 hover:border-gray-400'}`}
                                >
                                    <input
                                        type="checkbox"
                                        id={`option-${question.id}-${idx}`}
                                        name={`question-${question.id}`}
                                        value={opt}
                                        checked={selected}
                                        onChange={(e) => {
                                            const newVals = e.target.checked
                                                ? [...answer, opt]
                                                : answer.filter(
                                                    (v) => v !== opt
                                                );
                                            onChange(question.id, newVals);
                                        }}
                                        className="hidden"
                                    />
                                    <span className="text-gray-800 text-base">
                                        {opt}
                                    </span>
                                </label>
                            );
                        })}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col max-w-4xl mx-auto mt-6 bg-white rounded-xl p-6 shadow-lg">
            <div className="flex flex-row justify-between items-baseline border-b pb-4 mb-4">
                <p className="text-lg text-xl font-semibold">

                    Question {question.id}
                </p>
                <p className="text-gray-500 text-sm ">
                    Points: {question.score}
                </p>
            </div>
            <p className="text-lg font-medium text-base font-normal">
                {question.question}
            </p>

            {renderInput()}

            {question.question_type === "single select" && (
                <div className="mx-auto">
                    <button
                        className="btn btn-sm justify-start w-full text-left"
                        onClick={() => onChange(question.id, "")}
                    >
                        Clear Selection
                    </button>
                </div>
            )}
        </div>
    );
};

export default QuestionContent;
