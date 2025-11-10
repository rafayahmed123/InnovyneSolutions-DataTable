import { useState } from "react";
import FileUploader from "../components/FileUploader/FileUploader";
import DataTable from "../components/DataTable/DataTable";
import AIQueryPanel from "../components/AIQueryPanel/AIQueryPanel";
import { uploadDataset, queryAI } from "../api/datasetApi";

export default function Dashboard() {
  const [datasetId, setDatasetId] = useState<string | null>(null);
  const [data, setData] = useState<any[]>([]);

  const handleUpload = async (file: File) => {
    const res = await uploadDataset(file);
    setDatasetId(res.datasetId);
    setData(res.rows);
  };

  const handleDataChange = (updated: any[]) => {
    setData(updated);
  };

  const handleAIQuery = async (question: string) => {
    if (!datasetId) return { answer: "Upload dataset first" };
    return await queryAI(datasetId, question);
  };

  return (
    <div className="dashboard-container">
      <h1>InnoVyne Data Explorer</h1>
      <FileUploader onUpload={handleUpload} />

      {data.length > 0 && (
        <DataTable data={data} onDataChange={handleDataChange} />
      )}

      {datasetId && (
        <AIQueryPanel datasetId={datasetId} onQuery={handleAIQuery} />
      )}
    </div>
  );
}
