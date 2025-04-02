const { auth } = require("express-oauth2-jwt-bearer");
const express = require("express");
const {
    saveCourse,
    getAllCourses,
} = require("../controllers/course.Controller");

const router = express.Router();

router.get("/", getAllCourses);
router.post("/saveCourse", saveCourse, auth());

module.exports = router;
