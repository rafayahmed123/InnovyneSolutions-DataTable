// Load .env as early as possible
require("dotenv").config();

const OpenAI = require("openai");

// Initialize OpenAI client
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function answerWithAI(dataset, question) {
  if (!dataset || !dataset.rows || dataset.rows.length === 0) {
    return { answer: "No data available." };
  }

  const dataPreview = JSON.stringify(dataset.rows.slice(0, 20));
  const prompt = `
  You are an AI assistant inside a web application for exploring and editing tabular data uploaded by the user.
  
  You are given a dataset preview (CSV/JSON parsed table). 
  Rely ONLY on this provided data.
  
  --------------------------------
  DATASET:
  ${dataPreview}
  --------------------------------
  
  USER REQUEST:
  ${question}
  --------------------------------
  
  Your responsibilities:
  1) Summarize the dataset when asked.
  2) Answer analytical questions using only columns + rows in the data.
  3) Detect interesting statistics (min/max/avg), patterns, anomalies, missing values.
  4) If requested, perform data edits (add / update / delete rows).
  5) If the request cannot be answered, ask clarifying questions.
  
  Rules:
  - Never hallucinate values that do not exist in the dataset.
  - If unsure, ask for clarification.
  - Avoid referencing implementation or file details.
  - Keep explanations concise but insightful.
  
  If providing a summary or analytical response, use this structure:
  {
    "summary": "optional summary text",
    "answer": "direct answer to the question",
    "details": []
  }
  
  If performing data modification, return ONLY structured JSON:
  {
    "action": "update" | "add" | "delete" | "none",
    "updates": [
      {
        "rowIndex": number,
        "oldValue": {},
        "newValue": {}
      }
    ],
    "newRows": [
      {}
    ],
    "deletedRows": [
      number
    ]
  }
  
  If no changes are needed, return:
  { "action": "none" }
  
  Respond based ONLY on the dataset above.
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
