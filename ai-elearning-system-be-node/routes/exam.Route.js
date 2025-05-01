const express = require("express");
const { getExamByCourseId } = require("../controllers/exam.Controller");

const router = express.Router();

router.get("/:id", getExamByCourseId);

module.exports = router;
