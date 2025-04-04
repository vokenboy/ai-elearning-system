const mongoose = require("mongoose");
require("dotenv").config();

const connectToDatabase = async () => {
    try {
        const uri = process.env.MONGO_DB_CONNECTION;
        if (!uri) {
            throw new Error(
                "Missing MongoDB connection URI. Please set MONGO_DB_CONNECTION in your .env file."
            );
        }
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("[Success] Connected to MongoDB");
    } catch (error) {
        console.error("[Error] Failed to connect to MongoDB:", error);
        process.exit(1);
    }
};

module.exports = connectToDatabase;
