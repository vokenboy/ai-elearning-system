const SolutionCard = ({ solution }) => {
    return (
        <div
            tabIndex={0}
            className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box mb-2"
        >
            <div className="collapse-title flex justify-between items-center">
                <span className="font-bold">
                    {solution.task.length > 50
                        ? solution.task.slice(0, 50) + "…"
                        : solution.task}
                </span>
                <span
                    className={`badge ${
                        solution.evaluation >= 80
                            ? "badge-success"
                            : "badge-warning"
                    }`}
                >
                    Score: {solution.evaluation}%
                </span>
            </div>
            <div className="collapse-content">
                <p className="mb-2">
                    <strong>Task:</strong> {solution.task}
                </p>
                <p className="mb-2">
                    <strong>Feedback:</strong> {solution.feedback}
                </p>
                <p className="text-xs text-gray-500">
                    Submitted:{" "}
                    {new Date(solution.createdAt).toLocaleString("lt-LT")}
                </p>
            </div>
        </div>
    );
};

export default SolutionCard;
