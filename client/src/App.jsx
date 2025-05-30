import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";
import "./App.css";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import CoursesPage from "./pages/CoursesPage";
import CourseContentPage from "./pages/CourseContentPage";
import TaskPage from "./pages/TaskPage";
import ExamPage from "./pages/ExamPage";
import ExamFeedbackPage from "./pages/ExamFeedback";
import EditorCoursePage from "./pages/EditorCoursePage";
import EditorContentPage from "./pages/EditorContentPage";
import UserProfile from "./pages/UserProfile";

function App() {

    return (
        <AuthProvider>
            <Router>
                <Navbar />
                <div className="h-24" />
                <div className="content-container">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/courses" element={<CoursesPage />} />
                        <Route path="/profile" element={<UserProfile />} />
                        <Route
                            path="/courses/:courseId/content"
                            element={<CourseContentPage />}
                        />

                        <Route
                            path="/courses/:courseId/task/:topicId"
                            element={<TaskPage />}
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
                        <Route
                            path="/courses/:courseId/exam"
                            element={<ExamPage />}
                        />
                        <Route
                            path="/courses/:courseId/examResults"
                            element={<ExamFeedbackPage />}
                        />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
