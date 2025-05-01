const express = require("express");
const { registerUser, loginUser, enrollUserToCourse, fetchUserCourses } = require("../controllers/user.Controller");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/:userId", fetchUserCourses);
router.put("/enroll/:userId", enrollUserToCourse);

module.exports = router;
