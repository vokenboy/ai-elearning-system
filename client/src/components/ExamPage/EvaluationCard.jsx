import { formatScore } from "../../context/examContext";
import AnswersReview from "./AnswersReview";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { AiOutlineCloseCircle } from "react-icons/ai";


const EvaluationCard = ({ index, question, userAnswer, evaluation }) => {

    const bgClass = userAnswer?.score === question?.score
        ? "border-green-200 bg-green-100"
        : userAnswer?.score === 0
            ? "border-red-200 bg-red-100"
            : "border-orange-200 bg-orange-100"

    const icon = userAnswer?.score === question?.score
        ? <AiOutlineCheckCircle className="text-green-500" />
        : userAnswer?.score === 0
            ? <AiOutlineCloseCircle className="text-red-500" />
            : <AiOutlineCloseCircle className="text-yellow-500" />

    return (
        <div
            key={index}
            className="flex flex-col h-full rounded-xl p-4 bg-base-100 shadow-lg border border-stone-100"
        >
            <div className="flex flex-col gap-4">
                <div className="flex flex-row justify-between items-left">
                    <div className="flex flex-col gap-4">
                        <h1 className="flex items-center gap-2 text-xl font-bold">
                            <span className="text-green-600 text-2xl">{icon}</span>
                            <span>Question {index + 1}:</span>
                        </h1>
                        <h2 className="text-lg font-medium text-base font-normal">
                            {question?.question}
                        </h2>
                    </div>
                    <div className={`inline-flex items-center gap-2 text-sm px-3 py-1 rounded-md max-h-10 shadow-sm whitespace-nowrap border ${bgClass} `}>
                        <span className="text-base font-medium">
                            Score:
                        </span>
                        <span className="font-medium text-base tracking-tight ">
                            {formatScore(userAnswer?.score)} / {question?.score}
                        </span>
                    </div>


                </div>
                <hr className="border-gray-800" />

                <p>Your answer:</p>
                <AnswersReview
                    question={question}
                    answer={userAnswer?.answers}
                    showCorrect={false}
                />

                <hr className="border-gray-800" />
                <p>Correct answer:</p>
                <AnswersReview
                    question={question}
                    answer={question?.answers}
                />


                <hr className="border-gray-800" />
                <div className="text-gray-500">
                    Feedback:  {evaluation?.feedback}
                </div>

            </div>
        </div >
    );

}


export default EvaluationCard;