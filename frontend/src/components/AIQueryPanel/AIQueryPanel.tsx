import React, { useState } from "react";

export default function AIQueryPanel({ datasetId, onQuery }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState(null);

  const handleSubmit = async () => {
    if (!question) return;
    const res = await onQuery(question);
    setAnswer(res);
  };

  return (
    <div style={{ marginTop: "1rem" }}>
      <input
        type="text"
        placeholder="Ask a question..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        style={{ width: "70%" }}
      />
      <button onClick={handleSubmit}>Ask AI</button>
      {answer && (
        <div style={{ marginTop: "1rem" }}>
          <strong>Answer:</strong> {answer.answer}
        </div>
      )}
    </div>
  );
}
