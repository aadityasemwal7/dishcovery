const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config({ path: "d:/dishcovery/app/backend/.env" });

async function listModels() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  try {
    // We can fetch models using a simple fetch request since the SDK might not expose listModels directly in older versions
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`);
    const data = await res.json();
    console.log(data.models.map(m => m.name));
  } catch (err) {
    console.error(err);
  }
}

listModels();
