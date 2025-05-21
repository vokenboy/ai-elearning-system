const AnswersReview = ({ question, answer, showCorrect = true }) => {
    const correctAnswers = question.answers ?? [];

    const renderInput = () => {
        switch (question.question_type) {
            case "open":
                return (
                    <div className="whitespace-pre-wrap bg-white p-2 min-h-20 rounded-md text-base rounded-lg w-full">
                        {answer}
                    </div>
                );
            case "single select":
                return (
                    <div className="grid gap-4 mt-4 mb-4">
                        {question.options.map((opt, idx) => {
                            const isCorrect = correctAnswers.includes(opt);
                            const isSelected = opt === answer;

                            return (
                                <div
                                    key={idx}
                                    className={`px-4 py-2 border rounded-xl ${isSelected
                                            ? isCorrect
                                                ? "border-green-600 bg-green-50 text-green-800"
                                                : "border-red-500 bg-red-50 text-red-700"
                                            : isCorrect && showCorrect
                                                ? "border-green-600 bg-green-50 text-green-800"
                                                : "border-gray-300 text-gray-700"
                                        }`}
                                >
                                    {opt}
                                </div>
                            );
                        })}
                    </div>
                );
            case "multiple select":
                return (
                    <div className="grid gap-2 mt-4 mb-4">
                        {question.options.map((opt, idx) => {
                            const isSelected = Array.isArray(answer) && answer.includes(opt);
                            const isCorrect = correctAnswers.includes(opt);
                            return (
                                <div
                                    key={idx}
                                    className={`px-4 py-2 border rounded-xl ${isSelected
                                            ? isCorrect
                                                ? "border-green-600 bg-green-50 text-green-800"
                                                : "border-red-500 bg-red-50 text-red-700"
                                            : isCorrect && showCorrect
                                                ? "border-green-600 bg-green-50 text-green-800"
                                                : "border-gray-300 text-gray-700"
                                        }`}
                                >
                                    {opt}
                                </div>
                            )
                        })}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="max-w-full p-2 bg-white text-base text-left rounded-lg">
            {renderInput()}
        </div>
    );
};

export default AnswersReview;
