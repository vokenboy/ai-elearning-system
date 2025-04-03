const express = require("express");
const Course = require("../models/course.Model");
const { getCourse, saveCourse } = require("../controllers/course.Controller");

const router = express.Router();

router.get("/", getCourse);
router.post("/saveCourse", saveCourse);

module.exports = router;
