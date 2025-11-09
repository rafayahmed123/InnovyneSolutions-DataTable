const { summarizeDataset } = require("./summarize.service");

// Simple rule-based Q&A
function isNumber(v) {
  return v !== null && v !== "" && !isNaN(Number(v));
}

function answerQuestion(dataset, query) {
  if (!dataset || !dataset.rows || dataset.rows.length === 0) {
    return { answer: "No data available." };
  }

  const data = dataset.rows;
  const q = query.toLowerCase();

  if (q.includes("summar")) {
    return { answer: "Summary:", summary: summarizeDataset(data) };
  }

  // Pattern: which X had the highest Y
  const match = q.match(/which (.+) had the (highest|max|largest) (.+)/i);
  if (match) {
    const subjectRaw = match[1].trim();
    const measureRaw = match[3].trim();

    const cols = Object.keys(data[0]);

    const subjectCol =
      cols.find((c) => c.toLowerCase().includes(subjectRaw)) || cols[0];
    const measureCol =
      cols.find((c) => c.toLowerCase().includes(measureRaw)) ||
      cols.find((c) => isNumber(data[0][c]));

    if (!measureCol) {
      return { answer: `Couldn't find numeric field for "${measureRaw}"` };
    }

    let bestVal = -Infinity;
    let bestRow = null;

    for (const row of data) {
      const val = Number(row[measureCol]);
      if (isNumber(val) && val > bestVal) {
        bestVal = val;
        bestRow = row;
      }
    }

    return {
      answer: `Best ${subjectCol} by ${measureCol}: ${bestRow?.[subjectCol]}`,
      value: bestVal,
      row: bestRow,
    };
  }

  return {
    answer:
      "Could not interpret the question. Try: 'summarize' or 'Which product had the highest sales?'",
  };
}

module.exports = { answerQuestion };
