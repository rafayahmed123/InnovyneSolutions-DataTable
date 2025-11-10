const fs = require("fs");
const { parseFile, convertRowsToCSV } = require("../utils/convertRowsToCsv");

exports.updateFile = async (req, res) => {
  const { filePath, rows } = req.body;

  if (!filePath)
    return res.status(400).json({ error: "No file path provided" });

  try {
    const csvData = convertRowsToCSV(rows); // convert JS array back to CSV
    fs.writeFileSync(filePath, csvData, "utf8");
    return res.json({ success: true });
  } catch (err) {
    console.error("File update error:", err);
    return res.status(500).json({ error: "Failed to update file" });
  }
};
