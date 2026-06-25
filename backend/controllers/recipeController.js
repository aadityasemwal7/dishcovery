// Suggest dishes based on user-provided ingredients
exports.suggestDishes = async (req, res) => {
    try {
        const { ingredients, preferences } = req.body;

        // --- Validation ---

        // ingredients must be a non-empty array
        if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
            return res.status(400).json({ message: "Please provide at least one ingredient." });
        }

        // Cap at 20 ingredients
        if (ingredients.length > 20) {
            return res.status(400).json({ message: "Maximum 20 ingredients allowed." });
        }

        // Sanitize each ingredient: must be non-empty string, alphanumeric/spaces/hyphens only, max 50 chars
        const sanitized = [];
        for (const item of ingredients) {
            if (typeof item !== "string") {
                return res.status(400).json({ message: "Each ingredient must be a text value." });
            }
            const trimmed = item.trim().toLowerCase();
            if (trimmed.length === 0) {
                return res.status(400).json({ message: "Ingredient cannot be empty." });
            }
            if (trimmed.length > 50) {
                return res.status(400).json({ message: `Ingredient "${trimmed.slice(0, 20)}..." is too long. Maximum 50 characters.` });
            }
            if (!/^[a-zA-Z0-9\s\-']+$/.test(trimmed)) {
                return res.status(400).json({ message: `Ingredient "${trimmed}" contains invalid characters. Use only letters, numbers, spaces, and hyphens.` });
            }
            sanitized.push(trimmed);
        }

        // Deduplicate
        const uniqueIngredients = [...new Set(sanitized)];

        // Validate optional preferences
        if (preferences !== undefined && preferences !== null) {
            if (typeof preferences !== "string" || preferences.length > 100) {
                return res.status(400).json({ message: "Preferences must be text, maximum 100 characters." });
            }
        }

        // --- AI Call ---

        const geminiService = require("../services/geminiService");
        const suggestions = await geminiService.suggestDishes(uniqueIngredients, preferences || undefined);

        res.json({ suggestions });

    } catch (err) {
        console.error("suggestDishes error:", err);

        if (err.message === "GEMINI_TIMEOUT") {
            return res.status(504).json({ message: "AI is taking too long. Please try again." });
        }
        if (err.message === "GEMINI_INVALID_RESPONSE" || err.message === "GEMINI_EMPTY_RESPONSE") {
            return res.status(502).json({ message: "AI returned an unexpected response. Please try again." });
        }
        if (err.message && err.message.includes("GEMINI_API_KEY")) {
            return res.status(503).json({ message: "AI service is not configured. Please contact the administrator." });
        }

        // Handle specific Gemini API errors (like 429 Quota Exceeded)
        if (err.status === 429) {
            return res.status(429).json({ message: "AI Service Quota Exceeded. Please try again later or check your API plan." });
        }
        
        if (err.name === "GoogleGenerativeAIFetchError") {
            return res.status(502).json({ message: `AI Service Error: ${err.message}` });
        }

        res.status(500).json({ message: err.message || "Failed to generate dish suggestions. Please try again." });
    }
};
