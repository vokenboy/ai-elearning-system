import { useParams } from "react-router-dom";
import { useState } from "react";
import DashboardLayout from "../components/Dashboards/DashboardLayout";

const CourseContent = () => {
    const { courseId } = useParams();

    const hardcodedCourses = [
        {
            _id: "1",
            title: "Frontend Essentials",
            creator: "Alice Designer",
            tags: ["html", "css", "javascript"],
            createdAt: "2025-03-20T10:30:00Z",
            topics: [
                {
                    id: "1-1",
                    title: "HTML Basics",
                    description: "Learn the structure of webpages using HTML.",
                    theory: "HTML uses elements to structure content...",
                    tags: ["html", "markup"],
                },
                {
                    id: "1-2",
                    title: "CSS Styling",
                    description: "Style your HTML with CSS.",
                    theory: "CSS allows you to control layout, color, and fonts...",
                    tags: ["css", "design"],
                },
            ],
        },
        {
            _id: "2",
            title: "Backend with Node.js",
            creator: "Bob Backend",
            tags: ["nodejs", "express", "api"],
            createdAt: "2025-02-15T09:00:00Z",
            topics: [
                {
                    id: "2-1",
                    title: "Node.js Intro",
                    description:
                        "Understand what Node.js is and why it's useful.",
                    theory: "Node.js allows JS to run on the server...",
                    tags: ["nodejs", "backend"],
                },
                {
                    id: "2-2",
                    title: "Building APIs",
                    description: "Use Express to build your first REST API.",
                    theory: "Express simplifies routing and middleware usage...",
                    tags: ["api", "express"],
                },
            ],
        },
    ];

    const course = hardcodedCourses.find((c) => c._id === courseId);

    const [selectedTopicId, setSelectedTopicId] = useState(
        course?.topics[0]?.id || ""
    );

    const selectedTopic = course?.topics.find((t) => t.id === selectedTopicId);

    if (!course) {
        return <h2>Course not found</h2>;
    }

    return (
        <DashboardLayout
            topics={course.topics}
            onTopicSelect={(id) => setSelectedTopicId(id)}
        >
            <h2>{selectedTopic?.title}</h2>
            <p>
                <strong>Description:</strong> {selectedTopic?.description}
            </p>
            <p>
                <strong>Theory:</strong> {selectedTopic?.theory}
            </p>
            <p>
                <strong>Tags:</strong> {selectedTopic?.tags.join(", ")}
            </p>
        </DashboardLayout>
    );
};

export default CourseContent;
