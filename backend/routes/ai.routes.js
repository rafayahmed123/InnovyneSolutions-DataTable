const express = require("express");
const { getDataset } = require("../data/dataStore");
const { answerWithAI } = require("../services/openai.service");

const router = express.Router();

// POST /api/ai/query
router.post("/query", async (req, res) => {
  const { datasetId, question } = req.body;

  const dataset = getDataset(datasetId);
  if (!dataset) return res.status(404).json({ error: "Dataset not found" });

  const answer = await answerWithAI(dataset, question);
  res.json(answer);
});

module.exports = router;
