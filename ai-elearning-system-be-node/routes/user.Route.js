const express = require("express");
const {
    createUser,
    updateUser,
    deleteUser,
    getUserById,
} = require("../controllers/user.controller");

const router = express.Router();

router.post("/post", createUser);
router.get("/get/:id", getUserById);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);

module.exports = router;
