function convertRowsToCSV(rows) {
  if (!rows || rows.length === 0) return "";

  const headers = Object.keys(rows[0]);
  const csvRows = [];

  csvRows.push(headers.join(","));

  for (const row of rows) {
    const vals = headers.map((h) => {
      const val = row[h] ?? "";
      if (typeof val === "string" && val.includes(",")) {
        return `"${val}"`;
      }
      return val;
    });
    csvRows.push(vals.join(","));
  }

  return csvRows.join("\n");
}

module.exports = { convertRowsToCSV };
