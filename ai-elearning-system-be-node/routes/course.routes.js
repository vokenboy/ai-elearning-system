const { authenticate, authorize } = require("../middleware/auth");
const express = require("express");
const {
    saveCourse,
    deleteCourse,
    getAllCourses,
    updateCourse,
    getCourseById,
    getCourseCertificate
} = require("../controllers/course.Controller");

const router = express.Router();


router.get("/", getAllCourses);
router.post("/saveCourse", authenticate, authorize("Editor"), saveCourse);
router.delete("/:id", authenticate, authorize("Editor"), deleteCourse);
router.put("/:id", authenticate, authorize("Editor"), updateCourse);
router.get("/:id", getCourseById);
//router.get("/:id/certificate", authorize("User"), getCourseCertificate);
router.get("/:id/certificate", getCourseCertificate);

module.exports = router;
