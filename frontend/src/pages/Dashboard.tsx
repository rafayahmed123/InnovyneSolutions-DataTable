import { useState } from "react";
import FileUploader from "../components/FileUploader/FileUploader";
import DataTable from "../components/DataTable/DataTable";
import AIQueryPanel from "../components/AIQueryPanel/AIQueryPanel";
import { uploadDataset, queryAI, updateFileRows } from "../api/datasetApi";

export default function Dashboard() {
  const [filePath, setFilePath] = useState<string | null>(null);
  const [data, setData] = useState<any[]>([]);

  const handleUpload = async (file: File) => {
    const res = await uploadDataset(file);
    setFilePath(res.filePath);
    setData(res.rows);
  };

  const handleDataChange = async (updated: any[]) => {
    setData(updated);

    if (filePath) {
      try {
        await updateFileRows(filePath, updated);
      } catch (err) {
        console.error("Failed to update file:", err);
      }
    }
  };

  const handleAIQuery = async (question: string) => {
    if (!filePath) return { answer: "Upload dataset first" };
    return await queryAI(filePath, question);
  };

  return (
    <div className="dashboard-container">
      <h1>InnoVyne Data Explorer</h1>
      <FileUploader onUpload={handleUpload} />

      {data.length > 0 && (
        <DataTable data={data} onDataChange={handleDataChange} />
      )}

      {filePath && (
        <AIQueryPanel datasetId={filePath} onQuery={handleAIQuery} />
      )}
    </div>
  );
}
