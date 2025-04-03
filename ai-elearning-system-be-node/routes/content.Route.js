const express = require("express");
const {
    addContent,
    getContent,
    getContentByCourseId,
} = require("../controllers/content.Controller");

const router = express.Router();

router.post("/addContent", addContent);
router.get("/", getContent);
router.get("/:courseId", getContentByCourseId);

module.exports = router;
