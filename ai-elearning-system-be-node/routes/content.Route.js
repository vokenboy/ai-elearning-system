const express = require("express");
const {
    addContent,
    getContentByCourseId,
    getContent,
    deleteContentById,
    updateContentById,
    getContentByContentId,
} = require("../controllers/content.Controller");
const { authenticate, authorize } = require("../middleware/auth");

const router = express.Router();

router.post("/addContent", authenticate, authorize("Editor"), addContent);
router.get("/:courseId", getContentByCourseId);
router.get("/", getContent);
router.delete(
    "/:contentId",
    authenticate,
    authorize("Editor"),
    deleteContentById
);
router.put("/:contentId", authenticate, authorize("Editor"), updateContentById);
router.get("/getContent/:contentId", getContentByContentId);

module.exports = router;
