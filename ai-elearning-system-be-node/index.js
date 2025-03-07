const express = require("express");
require("dotenv").config();
const connectToDatabase = require("./db");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

const startServer = async () => {
    await connectToDatabase();
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
};

startServer();
