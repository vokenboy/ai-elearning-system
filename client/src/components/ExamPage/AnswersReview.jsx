const AnswersReview = ({ question, answer, showCorrect = true }) => {
    const correctAnswers = question.answers ?? [];

    const renderInput = () => {
        return (
            <div className="grid gap-4 mt-4 mb-4">
                {question.options.map((opt, idx) => {
                    const isCorrect = correctAnswers.includes(opt);
                    const isSelected = Array.isArray(answer)
                        ? answer.includes(opt)
                        : opt === answer;

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
    };

    return (
        <div className="max-w-full p-2 bg-white text-base text-left rounded-lg">
            {renderInput()}
        </div>
    );
};

export default AnswersReview;
