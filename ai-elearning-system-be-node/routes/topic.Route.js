const express = require("express");
const { getTopicsByCourseID } = require("../controllers/topic.Controller");

const router = express.Router();

router.get("/course/:courseID", getTopicsByCourseID);

module.exports = router;
