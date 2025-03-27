const express = require("express");
const { getCourses } = require("../controllers/course.Controller");

const router = express.Router();

router.get("",getCourses);

module.exports = router;
