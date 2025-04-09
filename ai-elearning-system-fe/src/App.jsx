import { BrowserRouter as Router, Navigate, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { AuthProvider } from "./context/authContext";
import CourseView from "./pages/CourseView";
import CourseContent from "./pages/CourseContent";
import TaskInterface from "./pages/TaskInterface";
import PrivateRoute from "./components/PrivateRoute";
import EditorCoursePage from "./pages/EditorCoursePage";
import EditorContentPage from "./pages/EditorContentPage";

function App() {
    console.log("App component rendering");

    return (
        <AuthProvider>
            <Router>
                <div className="app-container">
                    <Header />
                    <div
                        className="content-container"
                        style={{ paddingTop: "70px" }}
                    >
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/courses" element={<CourseView />} />
                            <Route
                                path="/courses/:courseId/content"
                                element={<CourseContent />}
                            />
                            <Route
                                path="/courses/:courseId/task/:topicId"
                                element={<TaskInterface />}
                            />
                            <Route element={<PrivateRoute allowedRoles={['Admin', 'Editor']} />}>
                                <Route path="/editor/courses" element={<EditorCoursePage />} />
                                <Route path="/editor/courses/:courseId/content" element={<EditorContentPage />} />
                            </Route>
                        </Routes>
                    </div>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
