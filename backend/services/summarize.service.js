function isNumber(v) {
  return v !== null && v !== "" && !isNaN(Number(v));
}

function summarizeDataset(data) {
  if (!Array.isArray(data) || data.length === 0) return { rows: 0, columns: 0 };

  const cols = Object.keys(data[0]);
  const summary = {
    rows: data.length,
    columns: cols.length,
    columnsSummary: {},
  };

  for (const col of cols) {
    const values = data.map((r) => r[col]);
    const numeric = values.filter(isNumber).map(Number);

    const colStats = {
      nonEmpty: values.filter((v) => v != null && v !== "").length,
      type: numeric.length > 0 ? "numeric" : "categorical",
    };

    if (numeric.length > 0) {
      const min = Math.min(...numeric);
      const max = Math.max(...numeric);
      const avg = numeric.reduce((a, b) => a + b, 0) / numeric.length;
      const variance =
        numeric.reduce((acc, n) => acc + Math.pow(n - avg, 2), 0) /
        numeric.length;
      const std = Math.sqrt(variance);

      colStats.min = min;
      colStats.max = max;
      colStats.avg = avg;
      colStats.std = std;
      colStats.anomalies = numeric.filter((n) => Math.abs(n - avg) > 3 * std);
    }

    summary.columnsSummary[col] = colStats;
  }

  return summary;
}

module.exports = { summarizeDataset };
