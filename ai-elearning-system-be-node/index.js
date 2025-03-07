const express = require("express");
require("dotenv").config();
const connectToDatabase = require("./db");

const userRoutes = require("./routes/user.Route");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/users", userRoutes);

const startServer = async () => {
    await connectToDatabase();
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
};

startServer();
