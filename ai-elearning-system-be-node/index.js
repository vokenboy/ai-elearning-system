const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectToDatabase = require("./db");

const userRoutes = require("./routes/user.Route");
const courseRoutes = require("./routes/course.routes");
const contentRoutes = require("./routes/content.Route");
const examRoutes = require("./routes/exam.Route");
const examContentRoutes = require("./routes/examContent.Route");

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/contents", contentRoutes);
app.use("/api/exams", examRoutes);
app.use("/api/exam_contents", examContentRoutes);

const startServer = async () => {
    await connectToDatabase();
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
};

startServer();
