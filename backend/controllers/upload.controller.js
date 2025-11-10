const { parseFile } = require("../utils/parseFile");

exports.handleUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const parsedData = await parseFile(req.file);

    return res.json({
      message: "File uploaded + parsed",
      filePath: req.file.path,
      rows: parsedData,
    });
  } catch (err) {
    console.error("Upload error:", err);
    return res.status(500).json({ error: "Failed to parse file" });
  }
};
