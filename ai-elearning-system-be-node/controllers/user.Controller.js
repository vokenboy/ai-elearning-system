const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user.Model");

exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res
                .status(400)
                .json({ error: "Please provide all required fields" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid email format" });
        }

        if (password.length < 8) {
            return res
                .status(400)
                .json({ error: "Password must be at least 8 characters long" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        const user = new User({ name, email, password, role: "User" });
        await user.save();

        res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ error: "Server error" });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res
                .status(400)
                .json({ error: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const payload = {
            id: user._id,
            role: user.role,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        res.status(200).json({
            message: "Login successful",
            token,
        });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ error: "Server error" });
    }
};

exports.fetchUserCourses = async (req, res) => {
    try {
        const { userId } = req.params;
        if (!userId) {
            return res.status(404).json({ error: "User not found" });
        }

        const existingUser = await User.findOne({ "_id": userId });
        if (existingUser) {
            courses = existingUser.courses
            if(!courses){
                return res.status(404).json({ error: "Courses not found" });
            }
            res.json(courses)
        }
    } catch (error) {
        console.error("Error fetching user courses:", error);
        res.status(500).json({ error: "Server error" });
    }
};

exports.enrollUserToCourse = async (req, res) => {
    try {
        const { userId } = req.params;
        const { courseId } = req.body;
        if (!userId || !courseId) {
            return res
                .status(400)
                .json({ error: "Provide userId and courseId" });
        }

        const existingUser = await User.findOne({ "_id": userId });
        if (existingUser) {
            courses = existingUser.courses
            if(!courses.includes(courseId)){
                courses.push(courseId);
            }
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                {courses},
                {new: true}
            );
        }
        else {
            return res.status(404).json({error: "User not found. Please login."});
        }
        res.status(200).json({message: "User enrolled successfully"});
    } catch (error) {
        console.error("Error enrolling user:", error);
        res.status(500).json({ error: "Server error" });
    }
};
