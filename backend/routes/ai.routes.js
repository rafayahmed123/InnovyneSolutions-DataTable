const express = require("express");
const { answerQuestion } = require("../services/ai.service");
const { getDataset } = require("../data/dataStore");

const router = express.Router();

// POST /api/ai/query
router.post("/query", (req, res) => {
  const { datasetId, question } = req.body;

  const dataset = getDataset(datasetId);
  if (!dataset) return res.status(404).json({ error: "Dataset not found" });

  const answer = answerQuestion(dataset, question);
  res.json(answer);
});

module.exports = router;
