const express = require("express");
const { getExamByCourseId, addExamSchema } = require("../controllers/exam.Controller");

const router = express.Router();

router.get("/:id", getExamByCourseId);
router.post("/addExamSchema", addExamSchema);

module.exports = router;
