import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CourseView from "./pages/CourseView";
import { AuthProvider } from "./context/authContext";

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
                            <Route path="/test" element={<CourseView />} />
                        </Routes>
                    </div>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
