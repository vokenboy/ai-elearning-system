const express = require("express");
const Course = require("../models/course.Model");
const { saveCourse, deleteCourse } = require("../controllers/course.Controller");

const router = express.Router();

// Gauti visus kursus
router.get("/", async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Sukurti naują kursą
router.post("/saveCourse", saveCourse);

// Ištrinti kursą pagal ID
router.delete("/:id", deleteCourse);

module.exports = router;
