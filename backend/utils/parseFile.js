const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

async function parseCSV(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => results.push(row))
      .on("end", () => resolve(results))
      .on("error", (err) => reject(err));
  });
}

exports.parseFile = async (file) => {
  const ext = path.extname(file.originalname).toLowerCase();

  if (ext === ".json") {
    const data = JSON.parse(fs.readFileSync(file.path, "utf-8"));
    return data;
  }

  if (ext === ".csv") {
    return await parseCSV(file.path);
  }

  throw new Error("Unsupported file type");
};
