# InnoVyne Solutions – Data Explorer

## Project Overview

InnoVyne Solutions is a full-stack application that allows users to upload datasets, explore them in a table interface, and query insights using an AI-powered assistant. The project is split into **frontend** and **backend** folders.

---

## Architecture

### Frontend

- **Framework:** React + TypeScript, built with Vite.
- **Components:**
  - `FileUploader` – Upload CSV or JSON datasets.
  - `DataTable` – Editable table interface for dataset rows.
  - `AIQueryPanel` – Ask questions to the AI about the dataset.
- **State Management:** Local state (`useState`) for dataset and question handling.
- **Table Management:** `@tanstack/react-table` for flexible, editable tables.
- **Styling:** Component-based CSS files.
- **API Communication:** `datasetApi` handles interactions with backend endpoints for uploads and AI queries.
- **Loader UI:** Shows a visual indicator while waiting for AI responses.

### Backend

- **Framework:** Express.js
- **Routes:**
  - `upload.routes.js` – Endpoint to upload CSV/JSON datasets (`POST /api/upload`).
  - `ai.routes.js` – Endpoint to query AI using dataset (`POST /api/ai/query`).
- **Controllers & Services:**
  - `upload.controller.js` – Handles file parsing and dataset storage.
  - `openai.service.js` – Integrates OpenAI API for AI question-answering.
  - `summarize.service.js` – Generates statistical summaries and anomaly detection for datasets.
- **Data Storage:** In-memory dataset storage via `dataStore`.
- **Middleware:** `cors` and `express.json()` for handling requests.
- **File Handling:** `multer` used to handle file uploads.
- **Environment Variables:** `.env` stores sensitive credentials like OpenAI API key.
- **Server Entry:** `server.js` initializes routes and starts server.

---

## Tech Stack

- **Frontend:** React, TypeScript, Vite, @tanstack/react-table
- **Backend:** Node.js, Express.js, Multer
- **AI Integration:** OpenAI API (`gpt-4o-mini`)
- **Utilities:** CSV parsing (`csv-parser`), UUID generation, dotenv for environment variables
- **Dev Tools:** Nodemon, CORS for cross-origin requests

---

## Features

1. **Dataset Upload:** Upload CSV or JSON files via drag-and-drop or file select.
2. **Editable Tables:** Inline editing of dataset rows, add/delete rows dynamically.
3. **AI-Powered Queries:** Ask questions about dataset content using OpenAI.
4. **Data Summarization:** Statistical summaries including min, max, avg, std, and anomaly detection.
5. **User Experience:** Visual loaders during AI queries and responsive UI.

---

## Setup Instructions

## Frontend

InnoVyne Solutions is a full-stack application that allows users to upload datasets, explore them in a table interface, and query insights using an AI-powered assistant. The project is split into **frontend** and **backend** folders.

## Backend

```bash
cd backend
npm install
cp .env.example .env # add your OpenAI API key
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Access

Frontend: http://localhost:5173
(Vite default)

Backend API: http://localhost:5001

## Future Improvements / Suggestions

### Persistent Data Storage

- Move from in-memory storage to a database (MongoDB, PostgreSQL).

### Authentication & User Management

- Secure endpoints and allow user-specific datasets.

### Error Handling

- Improve AI rate-limit handling and dataset parsing errors.

### Advanced Table Features

- Add pagination, filtering, sorting, and exporting datasets.

### AI Enhancements

- Summarization of large datasets.
- Ability to handle multi-file uploads.
- Use embeddings for semantic search queries on datasets.

### Frontend Improvements

- Use a UI library (e.g., MUI, Tailwind) for consistent components and responsive layouts.

### Backend Modularization

- Refactor services and controllers for better scalability and testing.

### Testing

- Add unit tests (Jest) and integration tests for both frontend and backend.
