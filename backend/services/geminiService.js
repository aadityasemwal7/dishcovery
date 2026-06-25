const { GoogleGenerativeAI } = require("@google/generative-ai");

const GEMINI_TIMEOUT_MS = 15000;

/**
 * Suggest dishes based on a list of ingredients using Google Gemini AI.
 *
 * @param {string[]} ingredients - Sanitized, deduplicated ingredient list
 * @param {string} [preferences] - Optional dietary/style preferences
 * @returns {Promise<Array<{name: string, description: string, matchedIngredients: string[], cuisine: string}>>}
 */
async function suggestDishes(ingredients, preferences) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "your_gemini_api_key_here") {
        throw new Error("GEMINI_API_KEY is not configured in the .env file.");
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = buildPrompt(ingredients, preferences);

    // Call Gemini with a timeout
    const result = await Promise.race([
        model.generateContent(prompt),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error("GEMINI_TIMEOUT")), GEMINI_TIMEOUT_MS)
        ),
    ]);

    const responseText = result.response.text();

    // Parse and validate the response
    const suggestions = parseGeminiResponse(responseText);
    return suggestions;
}

/**
 * Build the prompt for Gemini.
 */
function buildPrompt(ingredients, preferences) {
    const ingredientsList = ingredients.join(", ");
    const preferencesClause = preferences
        ? `\nUser preferences: ${preferences}`
        : "";

    return `You are a professional chef and recipe expert.
Given the following ingredients, suggest exactly 6 dishes that can be made using PRIMARILY these ingredients.

Ingredients: ${ingredientsList}
${preferencesClause}

RULES:
1. Each dish must use at least 2 of the provided ingredients
2. Suggest dishes from diverse cuisines
3. Include a mix of easy and intermediate difficulty
4. Dish names should be real, commonly known recipes (not invented names)
5. Be realistic — don't suggest dishes that need many more ingredients beyond what was provided
6. The matchedIngredients array must ONLY contain ingredients from the provided list

Return ONLY a valid JSON array with this exact structure (no markdown fences, no explanation, no extra text):
[
  {
    "name": "Dish Name",
    "description": "One-sentence description of the dish",
    "matchedIngredients": ["ingredient1", "ingredient2"],
    "cuisine": "Cuisine Type"
  }
]`;
}

/**
 * Parse and validate the Gemini response text into a structured array.
 * Handles markdown code fences and malformed JSON gracefully.
 */
function parseGeminiResponse(responseText) {
    // Strip markdown code fences if present (```json ... ``` or ``` ... ```)
    let cleaned = responseText.trim();
    cleaned = cleaned.replace(/^```(?:json)?\s*\n?/i, "").replace(/\n?```\s*$/i, "");
    cleaned = cleaned.trim();

    let parsed;
    try {
        parsed = JSON.parse(cleaned);
    } catch (err) {
        console.error("Gemini returned invalid JSON:", responseText);
        throw new Error("GEMINI_INVALID_RESPONSE");
    }

    // Must be an array
    if (!Array.isArray(parsed)) {
        console.error("Gemini response is not an array:", parsed);
        throw new Error("GEMINI_INVALID_RESPONSE");
    }

    // Validate and normalize each suggestion
    const suggestions = [];
    for (const item of parsed) {
        if (
            typeof item.name !== "string" ||
            typeof item.description !== "string" ||
            !Array.isArray(item.matchedIngredients) ||
            typeof item.cuisine !== "string"
        ) {
            // Skip malformed items rather than failing entirely
            console.warn("Skipping malformed suggestion:", item);
            continue;
        }

        suggestions.push({
            name: item.name.trim(),
            description: item.description.trim(),
            matchedIngredients: item.matchedIngredients
                .filter((i) => typeof i === "string")
                .map((i) => i.trim().toLowerCase()),
            cuisine: item.cuisine.trim(),
        });
    }

    if (suggestions.length === 0) {
        throw new Error("GEMINI_EMPTY_RESPONSE");
    }

    return suggestions;
}

module.exports = { suggestDishes };
