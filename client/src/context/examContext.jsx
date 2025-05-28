
export async function evaluateAnswers(examContent) {
    let finalScore = 0;

    const evaluatedAnswers = examContent.user_answers.map(userAnswer => {
        let score = 0.0;
        const question = examContent.questions.find(q => q.id === userAnswer.id);
        if (!question)
            return userAnswer;

        const correctAnswers = question.answers || [];
        const userAnswers = Array.isArray(userAnswer.answers)
            ? userAnswer.answers
            : [userAnswer.answers];

        switch (question.question_type) {
            case "true/false":
            case "single select":
                score = correctAnswers[0] === userAnswers[0] ? question.score : 0;
                finalScore += score;
                break;
            case "multiple select":
                let correctCount = 0;
                userAnswers.forEach(ans => {
                    if (correctAnswers.includes(ans)) correctCount++;
                    else correctCount--;
                });

                score = (question.score / correctAnswers.length) * correctCount;
                score = Math.max(0, Math.min(score, question.score));
                finalScore += score;
                break;
        }

        return {
            ...userAnswer,
            score,
        };
    });
    return {
        ...examContent,
        user_answers: evaluatedAnswers,
        final_score: finalScore,
    };
}

export async function calculateTotalPoints(questions) {
    var totalPoints = 0;
    questions.map(question => {
        totalPoints += question.score;
    });
    return totalPoints;
}
export function formatScore(score) {
    if (typeof score !== "number") return score;

    const [integer, decimal] = score.toString().split(".");
    
    if (decimal && decimal.length > 2) {
        return score.toFixed(2);
    }
    return score;
}
