const express = require("express")
const router = express.Router()
const {loginUser, registerUser} = require("../controllers/authController")
const {updateUser} = require("../controllers/authController")
const {updatePassword} = require("../controllers/authController")
const {protect} = require("../middleware/authMiddleware")


router.post("/login", loginUser)

router.post("/register", registerUser)
router.put("/update", protect, updateUser)
router.put("/update-password", protect, updatePassword)

module.exports = router