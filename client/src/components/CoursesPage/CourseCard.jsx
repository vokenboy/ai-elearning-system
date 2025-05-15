import React from "react";

const CourseCard = ({ course, isEnrolled, onEnroll, onView }) => {
    return (
        <div className="card bg-base-100 shadow-xl h-full">
            <div className="card-body flex flex-col justify-between">
                <div>
                    <h2 className="card-title">{course.title}</h2>
                    <p className="text-sm opacity-70 mt-2">
                        {course.description}
                    </p>
                    <p className="mt-3">
                        <span className="font-semibold">Difficulty:</span>{" "}
                        {course.difficulty}
                    </p>
                    <p>
                        <span className="font-semibold">Created at:</span>{" "}
                        {new Date(course.createdAt).toLocaleDateString()}
                    </p>
                </div>

                <div className="card-actions justify-end mt-4 flex flex-col space-y-2">
                    <button
                        className={`btn ${
                            isEnrolled ? "btn-disabled" : "btn-primary"
                        } w-full`}
                        onClick={() => onEnroll(course._id)}
                        disabled={isEnrolled}
                    >
                        {isEnrolled ? "Enrolled" : "Enroll to course"}
                    </button>
                    <button
                        className="btn btn-secondary w-full"
                        onClick={() => onView(course._id)}
                    >
                        View Course
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;
