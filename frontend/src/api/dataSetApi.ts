import axios from "axios";

const API_BASE = "http://localhost:5001/api";

export const uploadDataset = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await axios.post(`${API_BASE}/upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
};

export const queryAI = async (datasetId: string, question: string) => {
  const res = await axios.post(`${API_BASE}/ai/query`, { datasetId, question });
  return res.data;
};
