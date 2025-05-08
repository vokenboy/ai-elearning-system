const express = require("express");
const {
    getExamByCourseId,
    createExam,
    updateExam,
    deleteExam,
} = require("../controllers/exam.Controller");

const router = express.Router();

router.get("/:id", getExamByCourseId);
router.post("/", createExam);
router.put("/:id", updateExam);
router.delete("/:id", deleteExam);

module.exports = router;
