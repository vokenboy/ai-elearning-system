const express = require("express");
const router = express.Router();
const {
    saveTaskSolution,
    getUserSolutions,
} = require("../controllers/solution.Controller");

router.post("/", saveTaskSolution);
router.get("/:userId", getUserSolutions);

module.exports = router;
