const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config({ path: "d:/dishcovery/app/backend/.env" });

async function testModel() {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent("Say 'hello world'");
    console.log("SUCCESS:", result.response.text());
  } catch (err) {
    console.error("ERROR:", err.message);
  }
}

testModel();
