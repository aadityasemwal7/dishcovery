const express = require("express")
const router = express.Router()
const {loginUser, registerUser} = require("../controllers/authControllers")
const {updateUser} = require("../controllers/authControllers")
const {protect} = require("../utils/authMiddleware")


router.post("/login", loginUser)

router.post("/register", registerUser)
router.put("/update", protect, updateUser)

module.exports = router