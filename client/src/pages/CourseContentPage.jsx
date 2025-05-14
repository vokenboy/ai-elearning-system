import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getContentByCourseId } from "../api/content/contentAPI";
import { generateTask } from "../api/task/taskAPI";
import ReactMarkdown from "react-markdown";
import Markdown from "../components/Markdown";
import TableOfContents from "../components/CourseContentPage/TableOfContents";

const CourseContentPage = () => {
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        loadTopics();
    }, [params.courseId]);

    const loadTopics = async () => {
        const courseId = params.courseId;
        if (!courseId) return;
        setLoading(true);
        try {
            const data = await getContentByCourseId(courseId);
            setTopics(data);
            setActiveIndex(0);
        } catch (error) {
            console.error("Error fetching topics:", error);
        }
        setLoading(false);
    };

    const handleGoToTask = async (topic) => {
        try {
            const payload = {
                topic: topic.topic,
                language: topic.language,
                description: topic.description,
                tags: topic.tags,
                level: topic.level || "beginner",
            };
            const taskData = await generateTask(payload);
            navigate(`/courses/${params.courseId}/task/${topic._id}`, {
                state: { taskData, topic: topic.topic },
            });
        } catch (error) {
            console.error("Error generating task:", error);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center mt-20">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    if (topics.length === 0) {
        return <p className="text-center mt-20">No topics available.</p>;
    }

    const tocItems = topics.map((t, idx) => ({
        id: String(idx),
        text: t.topic,
        level: 1,
    }));

    return (
        <>
            {tocItems.length > 0 && (
                <aside className="hidden lg:flex flex-col fixed left-0 top-20 w-80 h-[calc(100vh-5rem)] shadow-lg overflow-auto border-base-300">
                    <div className="p-4 flex-1 overflow-auto">
                        <TableOfContents
                            toc={tocItems}
                            onItemClick={(id) => setActiveIndex(Number(id))}
                        />
                    </div>
                    <div className="p-4">
                        <button
                            className="btn btn-outline btn-secondary w-full"
                            onClick={() =>
                                navigate(`/courses/${params.courseId}/exam`)
                            }
                        >
                            Exam
                        </button>
                    </div>
                </aside>
            )}

            <div className={tocItems.length > 0 ? "pl-0 lg:pl-80" : "pl-0"}>
                <div className="container mx-auto px-4 py-12 max-w-4xl">
                    <div className="card">
                        <div className="card-body">
                            <ReactMarkdown components={Markdown}>
                                {topics[activeIndex].description}
                            </ReactMarkdown>
                            <button
                                className="btn btn-primary max-w-50 mt-4"
                                onClick={() =>
                                    handleGoToTask(topics[activeIndex])
                                }
                            >
                                Try a task
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CourseContentPage;
