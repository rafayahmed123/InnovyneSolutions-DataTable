import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const uploadDataset = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await axios.post(`${API_BASE}/upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
};

export const updateFileRows = async (filePath: string, rows: any[]) => {
  const res = await axios.patch(`${API_BASE}/files/update`, { filePath, rows });
  return res.data;
};

export const queryAI = async (filePath: string, question: string) => {
  const res = await axios.post(`${API_BASE}/ai/query`, { filePath, question });
  return res.data;
};
