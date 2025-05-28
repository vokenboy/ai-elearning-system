import { formatScore } from "../../context/examContext";
import AnswersReview from "./AnswersReview";

const EvaluationCard = ({ index, question, userAnswer, evaluation }) => {
    const bgClass = userAnswer?.score === question?.score
        ? "border-teal-200 bg-teal-100"
        : userAnswer?.score === 0
            ? "border-secondary bg-pink-100"
            : "border-accent bg-orange-100"

    return (
        <div
            key={index}
            className={`flex flex-col h-full rounded-xl p-4 border ${bgClass} `}
        >
            <div className="flex flex-col gap-4">
                <div className="flex flex-row justify-between items-left">
                    <div className="flex flex-col gap-4">
                        <h1 className="text-xl font-bold">
                            Question {index + 1}:
                        </h1>
                        <h2 className="text-lg font-medium text-base font-normal">
                            {question?.question}
                        </h2>
                    </div>
                    <div className="inline-flex items-center gap-2 bg-base-100 text-sm px-3 py-1 rounded-md max-h-10 shadow-sm whitespace-nowrap">
                        <span className="text-base font-medium">
                            Score:
                        </span>
                        <span className="font-medium text-base tracking-tight ">
                            {formatScore(userAnswer?.score)} / {question?.score}
                        </span>
                    </div>


                </div>
                <hr className={bgClass} />

                <p>Your answer:</p>
                <AnswersReview
                    question={question}
                    answer={userAnswer?.answers}
                    showCorrect={false}
                />

                <hr className={bgClass} />
                <p>Correct answer:</p>
                <AnswersReview
                    question={question}
                    answer={question?.answers}
                />


                <hr className={bgClass} />
                <div className="text-gray-500">
                    Feedback:  {evaluation?.feedback}
                </div>

            </div>
        </div >
    );

}


export default EvaluationCard;