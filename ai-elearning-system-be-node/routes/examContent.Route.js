const express = require("express");

const {addExamWithAnswers} = require("../controllers/examContent.Controller");


const router = express.Router();

router.post("/addExamWithAnswers", addExamWithAnswers);

module.exports = router;