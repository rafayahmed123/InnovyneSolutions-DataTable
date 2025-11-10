import React, { useState } from "react";
import "./FileUploader.css";

interface FileUploaderProps {
  onUpload: (file: File) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onUpload }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (file) {
      onUpload(file);
      setFile(null);
    }
  };

  return (
    <div className="file-uploader">
      <input
        id="file-input"
        type="file"
        accept=".csv,.json"
        onChange={handleChange}
      />
      <label htmlFor="file-input" className="file-select-btn">
        {file ? file.name : "Choose File"}
      </label>
      <button onClick={handleUpload} disabled={!file} className="upload-btn">
        Upload
      </button>
    </div>
  );
};

export default FileUploader;
