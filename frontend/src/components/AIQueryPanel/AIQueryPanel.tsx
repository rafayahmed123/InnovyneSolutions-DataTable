import { useState } from "react";

interface AIQueryPanelProps {
  datasetId: string;
  onQuery: (question: string) => Promise<{ answer: string }>;
}

export default function AIQueryPanel({ onQuery }: AIQueryPanelProps) {
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<null | { answer: string }>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!question) return;
    setLoading(true);
    setAnswer(null);

    try {
      const res = await onQuery(question);
      setAnswer(res);
    } catch (err) {
      console.error(err);
      setAnswer({ answer: "Error getting AI response." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: "1rem" }}>
      <input
        type="text"
        placeholder="Ask a question..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        style={{ width: "70%", marginRight: "0.5rem", padding: "0.5rem" }}
      />
      <button onClick={handleSubmit} disabled={loading || !question}>
        {loading ? "Loading..." : "Ask AI"}
      </button>

      {answer && (
        <div style={{ marginTop: "1rem" }}>
          <strong>Answer:</strong> {answer.answer}
        </div>
      )}
    </div>
  );
}
