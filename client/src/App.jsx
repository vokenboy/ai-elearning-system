import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { AuthProvider } from "./context/authContext";
import Courses from "./pages/Courses";
import CourseContent from "./pages/CourseContent";
import TaskInterface from "./pages/TaskInterface";
import PrivateRoute from "./components/PrivateRoute";
import EditorCoursePage from "./pages/EditorCoursePage";
import EditorContentPage from "./pages/EditorContentPage";
import Exam from "./pages/Exam";

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/courses/:courseId/exam" element={<Exam />} />
                </Routes>

                <Navbar />
                <div className="h-24" />
                <div className="content-container">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/courses" element={<Courses />} />
                        <Route
                            path="/courses/:courseId/content"
                            element={<CourseContent />}
                        />

                        <Route
                            path="/courses/:courseId/task/:topicId"
                            element={<TaskInterface />}
                        />
                        <Route
                            element={
                                <PrivateRoute
                                    allowedRoles={["Admin", "Editor"]}
                                />
                            }
                        >
                            <Route
                                path="/editor/courses"
                                element={<EditorCoursePage />}
                            />
                            <Route
                                path="/editor/courses/:courseId/content"
                                element={<EditorContentPage />}
                            />
                        </Route>
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
