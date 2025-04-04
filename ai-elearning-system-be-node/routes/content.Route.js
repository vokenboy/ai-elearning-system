const express = require("express");
const { addContent, getContent } = require("../controllers/content.Controller");
const { authenticate, authorize } = require("../middleware/auth");

const router = express.Router();

router.post("/addContent", authenticate, authorize("Editor"), addContent);
router.get("/", getContent);

module.exports = router;
