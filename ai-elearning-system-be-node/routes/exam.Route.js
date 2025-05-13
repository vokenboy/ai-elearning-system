const express = require("express");

const {
    getExamByCourseId,
    createExam,
    updateExam,
    deleteExam,
    addExamSchema,
} = require("../controllers/exam.Controller");

const router = express.Router();

router.get("/:id", getExamByCourseId);

router.post("/addExamSchema", addExamSchema);

router.post("/", createExam);
router.put("/:id", updateExam);
router.delete("/:id", deleteExam);

module.exports = router;
