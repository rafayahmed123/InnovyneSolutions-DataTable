import React, { useState } from "react";
import FileUploader from "../components//FileUploader/FileUploader";
import DataTable from "../components/DataTable/DataTable";
import AIQueryPanel from "../components/AIQueryPanel/AIQueryPanel";
import { uploadDataset, queryAI } from "../api/datasetApi";

export default function Dashboard() {
  const [datasetId, setDatasetId] = useState(null);
  const [data, setData] = useState([]);

  const handleUpload = async (file) => {
    const res = await uploadDataset(file);
    setDatasetId(res.datasetId);
    setData(res.rows);
  };

  const handleAIQuery = async (question) => {
    if (!datasetId) return { answer: "Upload dataset first" };
    const res = await queryAI(datasetId, question);
    return res;
  };

  return (
    <div className="dashboard-container">
      <h1>InnoVyne Data Explorer</h1>
      <FileUploader onUpload={handleUpload} />
      {data.length > 0 && <DataTable data={data} />}
      {datasetId && (
        <AIQueryPanel datasetId={datasetId} onQuery={handleAIQuery} />
      )}
    </div>
  );
}
