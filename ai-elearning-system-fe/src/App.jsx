import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { AuthProvider } from "./context/authContext";
import CourseList from "./pages/CourseList";
import CourseContent from "./pages/CourseContent";
import TaskInterface from "./pages/TaskInterface";
import DashboardLayout from "./components/Dashboards/DashboardLayout";

function App() {
    return (
        <AuthProvider>
            <Router>
                <Header />
                <div className="content-container">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route
                            path="/courses"
                            element={
                                <DashboardLayout>
                                    <CourseList />
                                </DashboardLayout>
                            }
                        />
                        <Route
                            path="/courses/:courseId/content"
                            element={<CourseContent />}
                        />

                        <Route
                            path="/courses/:courseId/task/:topicId"
                            element={<TaskInterface />}
                        />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
