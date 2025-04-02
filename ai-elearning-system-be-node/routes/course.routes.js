const { auth } = require("express-oauth2-jwt-bearer");
const { authorize } = require("../middleware/auth");
const express = require("express");
const {
    saveCourse,
    getAllCourses,
} = require("../controllers/course.Controller");

const router = express.Router();

router.get("/", getAllCourses);
router.post("/saveCourse", authorize("Admin", "Editor"), saveCourse);

module.exports = router;
