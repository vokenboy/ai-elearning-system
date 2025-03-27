const express = require("express");
const { addContent, getContent } = require("../controllers/content.Controller");

const router = express.Router();

// Add content to course
router.post('/addContent', addContent);

// Add content to course
router.get("/", getContent);


module.exports = router;