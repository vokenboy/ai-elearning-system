const express = require("express");
const { registerUser, loginUser, enrollUserToCourse, fetchUserCourses, getCurrentUser,
updateCurrentUser,  } = require("../controllers/user.Controller");
const { authenticate } = require("../middleware/auth");


const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/me", authenticate, getCurrentUser); 
router.put("/me", authenticate, updateCurrentUser);

router.get("/:userId", fetchUserCourses);
router.put("/enroll/:userId", enrollUserToCourse);

module.exports = router;
