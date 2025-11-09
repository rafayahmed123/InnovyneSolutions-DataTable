# InnoVyne Data Explorer

A small web application to upload, explore, and analyze datasets with AI-assisted queries.

## **Architecture Overview**

The application is divided into **frontend** and **backend** layers:

### **Backend (Node.js + Express)**

- **Purpose:** Handles file uploads, parsing, and AI query logic.
- **Key features:**
  - `/api/upload` → Accepts CSV/JSON files and returns structured dataset rows with a `datasetId`.
  - `/api/ai/query` → Accepts a dataset ID and a user question, returning either a summary or an answer based on dataset content.
  - **In-memory data store** → Keeps datasets temporarily in memory for testing purposes.
  - **File parsing** → CSV/JSON parsing using `papaparse` for CSV and native JSON parsing.

### **Frontend (React + Vite + TypeScript)**

- **Purpose:** Provides a modern UI to interact with datasets and AI.
- **Key features:**
  - **File upload** → Upload CSV or JSON to the backend.
  - **Interactive table** → Renders uploaded data with editable cells and add-row functionality.
  - **AI panel** → Query the dataset using natural language.
- **Tech stack:**
  - **React + TypeScript** → Component-based UI.
  - **Vite** → Fast bundler for development.
  - **@tanstack/react-table** → Flexible table rendering and cell editing.
  - **Axios** → Handles API requests.

## **How It Works**

1. **User uploads a CSV/JSON file**

   - Frontend sends the file to `/api/upload`.
   - Backend parses the file and returns rows with a `datasetId`.

2. **Data Rendering**

   - Frontend stores the rows in state.
   - `DataTable` renders the dataset in an editable table.

3. **AI Queries**
   - User can type questions in the AI panel.
   - Frontend sends the question along with `datasetId` to `/api/ai/query`.
   - Backend returns an answer or summary.
   - Frontend displays the AI response.

---

## **Future Enhancements**

- Connect AI panel to **OpenAI ChatGPT API** for smarter answers.
- Add **persistent database** to store datasets.
- Improve **frontend UI/UX** with modern design and responsive layout.
- Implement **filtering, sorting, and advanced table features**.

---

## **Getting Started**

### Backend

```bash
cd backend
npm install
npm run dev
```
