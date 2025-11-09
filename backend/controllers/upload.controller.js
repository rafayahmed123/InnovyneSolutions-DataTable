const { parseFile } = require("../utils/parseFile");
const { addDataset } = require("../data/dataStore");
const crypto = require("crypto");

exports.handleUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const parsedData = await parseFile(req.file);

    const id = crypto.randomUUID();

    addDataset(id, req.file.originalname, parsedData);

    return res.json({
      message: "File uploaded + parsed + stored",
      datasetId: id,
      rows: parsedData,
    });
  } catch (err) {
    console.error("Upload error:", err);
    return res.status(500).json({ error: "Failed to parse file" });
  }
};
