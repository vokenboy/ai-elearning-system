const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectToDatabase = require("./db");

const userRoutes = require("./routes/user.Route");

const courseRoutes = require("./routes/course.Route");
const topicRoutes = require("./routes/topic.Route");


const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.use("/api/users", userRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/topic", topicRoutes);


const startServer = async () => {
    await connectToDatabase();
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
};

startServer();
