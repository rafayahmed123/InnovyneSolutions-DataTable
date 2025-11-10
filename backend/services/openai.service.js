// Load .env as early as possible
require("dotenv").config();

const OpenAI = require("openai");

// Check if the API key is loaded
console.log("OpenAI Key Loaded:", !!process.env.OPENAI_API_KEY);

// Initialize OpenAI client
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function answerWithAI(dataset, question) {
  if (!dataset || !dataset.rows || dataset.rows.length === 0) {
    return { answer: "No data available." };
  }

  // Limit dataset preview to avoid sending too much data
  const dataPreview = JSON.stringify(dataset.rows.slice(0, 20));

  const prompt = `
Here is a dataset: ${dataPreview}

Answer the following question based on this data:
${question}
  `;

  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0,
    });

    return { answer: response.choices[0].message.content };
  } catch (err) {
    console.error("OpenAI error:", err);
    // Return a meaningful message for the frontend
    if (err.response?.status === 429) {
      return {
        answer:
          "OpenAI API rate limit exceeded. Please try again later or check your quota.",
      };
    }
    return {
      answer: "Failed to get an AI answer. See server logs for details.",
    };
  }
}

module.exports = { answerWithAI };
