const { suggestDishes } = require("../controllers/recipeController");
const { protect } = require("../middleware/authMiddleware");
const express = require("express");
const router = express.Router();

router.post("/suggest-dishes", protect, suggestDishes);

module.exports = router;
