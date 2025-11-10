const express = require("express");
const fs = require("fs");
const { answerWithAI } = require("../services/openai.service");

const router = express.Router();

// POST /api/ai/query
router.post("/query", async (req, res) => {
  const { filePath, question } = req.body;

  if (!filePath) {
    return res.status(400).json({ error: "filePath is required" });
  }

  try {
    const raw = fs.readFileSync(filePath, "utf8");
    const rows = raw.split("\n").map((line) => line.split(",")); // simple parse

    const answer = await answerWithAI({ rows }, question);
    res.json(answer);
  } catch (err) {
    console.error("AI Query error:", err);
    return res.status(500).json({ error: "Failed to load file" });
  }
});

module.exports = router;
