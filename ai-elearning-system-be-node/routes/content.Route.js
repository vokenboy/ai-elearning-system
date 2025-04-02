const express = require("express");
const { addContent, getContent } = require("../controllers/content.Controller");

const router = express.Router();

router.post("/addContent", addContent);
router.get("/", getContent);

module.exports = router;
