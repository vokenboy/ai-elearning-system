import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box,
    Typography,
    CircularProgress,
    Alert,
    IconButton,
} from "@mui/material";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { addExamSchema } from "../../api/exam/examAPI";
import { getContentByCourseId } from "../../api/content/contentAPI";
import { getExamByCourseId } from "../../api/exam/examAPI";
import { getCourseById } from "../../api/course/courseAPI";

const QUESTION_TYPES = ["true/false", "single select", "multiple select"];

const ExamCreateDialog = ({ open, onClose, onSave, courseId }) => {
    const [formData, setFormData] = useState([
        {
            topic: "",
            score: 1,
            type: QUESTION_TYPES[0],
        }
    ]);
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        (async () => {
            try {
                const topics = await getContentByCourseId(courseId);
                const examSchema = await getExamByCourseId(courseId);
                setTopics(topics);
                if (open) {
                    if (examSchema && examSchema.questions_schema && examSchema.questions_schema.length > 0) {
                        setFormData(examSchema.questions_schema.map(({ topic, score, type }) => ({
                            topic,
                            score,
                            type,
                        })));
                    } else {
                        // No existing schema, initialize with default topic if any
                        setFormData([{
                            topic: topics[0]?.topic || "",
                            score: 1,
                            type: QUESTION_TYPES[0],
                        }]);
                    }
                    setError("");
                    setSuccess("");
                }
            } catch (err) {
                setErrorMessage(err.message);
            }
        })();
    }, [open, courseId]);

    const handleChange = (index, e) => {
        const values = [...formData];
        values[index][e.target.name] = e.target.value;
        setFormData(values);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const course = await getCourseById(courseId);
            let title = course.title;
            const questions_schema = formData.map((schema, index) => ({
                id: index,
                ...schema,
            }));
            await addExamSchema({
                examData: {
                    title,
                    courseId,
                    questions_schema,
                },
            });
            setSuccess("Exam created successfully!");
            setLoading(false)
            setTimeout(() => {
                if (onSave) onSave();
                onClose(true);
            }, 1000);
        } catch (err) {
            console.error("Error creating exam:", err);
            setError(
                err.message || "Failed to create exam schema. Please try again."
            );
            setLoading(false);
        }
    };

    const handleAddFields = () => {
        setFormData([...formData,
        { topic: topics[0].topic, score: 1, type: QUESTION_TYPES[0], }]);
    };

    const handleRemoveFields = (index) => {
        const values = [...formData];
        values.splice(index, 1);
        setFormData(values);
    };

    return (
        open && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800/50 transition-opacity">
                <div className="w-full max-w-6xl bg-white rounded-lg shadow-xl overflow-hidden">
                    <div className="border-b px-6 py-4">
                        <h2 className="text-lg font-semibold">Edit Exam Schema</h2>
                    </div>

                    <div className="p-6 max-h-[75vh] overflow-y-auto space-y-4">
                        {error && (
                            <div className="bg-red-100 text-red-700 p-3 rounded-md">
                                {error}
                            </div>
                        )}
                        {success && (
                            <div className="bg-green-100 text-green-700 p-3 rounded-md">
                                {success}
                            </div>
                        )}

                        {formData.map((data, index) => (
                            <div
                                key={index}
                                className="flex flex-col md:flex-row gap-4 items-center"
                            >
                                <div className="flex-1">
                                    <label className="block text-sm font-medium mb-1">
                                        Course topic
                                    </label>
                                    <select
                                        name="topic"
                                        value={data.topic}
                                        onChange={(e) => handleChange(index, e)}
                                        disabled={loading}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 hover:ring-2 hover:ring-gray-400 hover:outline-none"
                                    >
                                        {topics.map((topic) => (
                                            <option key={topic.topic} value={topic.topic}>
                                                {topic.topic}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex-1">
                                    <label className="block text-sm font-medium mb-1">
                                        Question type
                                    </label>
                                    <select
                                        name="type"
                                        value={data.type}
                                        onChange={(e) => handleChange(index, e)}
                                        disabled={loading}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 hover:ring-2 hover:ring-gray-400 hover:outline-none"
                                    >
                                        {QUESTION_TYPES.map((type) => (
                                            <option key={type} value={type}>
                                                {type}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="w-32">
                                    <label className="block text-sm font-medium mb-1">Score</label>

                                    <input
                                        name="score"
                                        type="number"
                                        min="1"
                                        value={data.score}
                                        onChange={(e) => handleChange(index, e)}
                                        disabled={loading}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 hover:ring-2 hover:ring-gray-400 hover:outline-none"
                                    />
                                </div>
                                <div className="flex items-center">
                                    <button
                                        type="button"
                                        disabled={formData.length <= 1}
                                        onClick={() => handleRemoveFields(index)}
                                        className={`btn btn-ghost p-2 mt-6 rounded-full hover:bg-white hover:border-white disabled:opacity-50       inline-flex items-center justify-center

                                            ${formData.length <= 1
                                                ? "disabled text-white"
                                                : "text-gray-500 cursor-pointer hover:text-gray-900"
                                            }`}
                                    >
                                        <RemoveIcon />
                                    </button>
                                </div>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={handleAddFields}
                            className="btn btn-secondary p-4 mt-4"
                        >
                            + Add field
                        </button>
                    </div>
                    <div className="flex justify-end gap-3 px-6 py-4 border-t">
                        <button
                            onClick={() => onClose(false)}
                            disabled={loading}
                            className="btn btn-ghost px-4 py-2 hover:bg-white hover:border-gray-100 disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="btn btn-primary disabled:opacity-50 flex items-center gap-2"
                        >
                            {loading && <CircularProgress size={20} className="text-white" />}
                            {loading ? "Saving..." : "Save changes"}
                        </button>
                    </div>
                </div>
            </div>
        )
    );
};

export default ExamCreateDialog;
