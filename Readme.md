# InnoVyne Solutions – Data Explorer

## Project Overview

InnoVyne Data Explorer is a lightweight full‑stack web application that lets users upload a dataset (CSV or JSON), explore & edit it in a table interface, and interact with an AI assistant to ask questions or summarize the data.

This project focuses on **rapid prototyping** with a minimal but flexible architecture.

---

## Architecture

### Frontend

- **Framework:** React + TypeScript (Vite)
- **State:** Local component state (`useState`) for simplicity
- **Tables:** `@tanstack/react-table` for a flexible editable grid
- **Key Components:**

  - `FileUploader` – Upload CSV/JSON
  - `DataTable` – View/edit dataset rows
  - `AIQueryPanel` – Query dataset with AI assistant

- **API Layer:** `datasetApi.ts` for backend communication
- **Why this works well:**

  - `tanstack-table` provides excellent feature‑extensibility
  - Minimal state overhead keeps the app easy to iterate on

### Backend

- **Framework:** Node.js + Express
- **Upload:** Uses Multer to store uploaded file on disk
- **Data Parsing:** Simple CSV/JSON parsing
- **AI:** Uses OpenAI (`gpt-4o-mini`) for dataset Q&A
- **Data Storage:** In‑memory (map keyed by datasetId)
- **Why this works well:**

  - Very fast for prototyping
  - Zero infrastructure required
  - No DB migrations/complexity

---

## Tech Stack

**Frontend:**

- React
- TypeScript
- Vite
- @tanstack/react-table

**Backend:**

- Node.js + Express
- Multer
- CSV Parser

**AI Integration:**

- OpenAI API (`gpt-4o-mini`)

**Utilities:**

- dotenv

---

## Features

✅ Upload CSV or JSON datasets
✅ Displays data in an interactive editable table
✅ Add / edit table rows
✅ Ask an AI assistant questions about the dataset
✅ Summarization support (stats, anomalies)

---

## Setup

### Backend

```bash
cd backend
npm install
cp .env.example .env # add OPENAI_API_KEY
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Access

- Frontend → [http://localhost:5173](http://localhost:5173)
- Backend API → [http://localhost:5001](http://localhost:5001)

---

## Prompting Strategy

The app sends a custom structured prompt to OpenAI:

```
You are a data analysis assistant.
You will be given a tabular dataset and a user question.

Your task:
1) Summarize the dataset when asked.
2) Answer questions strictly from the dataset.
3) If uncertain, say "Not enough information.".
4) Give concise answers.

Dataset Preview:
${dataPreview}

Question:
${question}
```

This prompt encourages:

- Direct, structured responses
- Better factual grounding
- Reduced hallucinations

---

## Scalability Considerations (Future Improvements)

The current version is optimized for **speed of development**, not long‑term scale. Future work may include:

### ✅ Data Layer

| Current              | Limitation                           | Improvement                   |
| -------------------- | ------------------------------------ | ----------------------------- |
| In‑memory store      | Data lost on restart; not multi‑user | Use PostgreSQL / MongoDB      |
| On‑disk file storage | No versioning                        | Store original & parsed forms |

### ✅ API / Backend

- Add pagination, filtering, validation, rate-limiting and caching within the APIs
- Expand summarizer to column‑profiling
- Pre‑compute statistics
- Add metadata versioning

### ✅ Frontend

- Introduce global store (Zustand/TanStack Query)
- Add visualization (charts)
- Bulk edit / multi‑select

### ✅ AI

- Use embeddings for semantic dataset search
- Auto‑detect anomalies
- Summaries based on metadata + stats instead of raw rows

### ✅ Production

- Deploy on managed infra (Railway / Fly.io / Render)
- Add logging + metrics
- Caching (Redis)

---

## Why This Tech Works Well for a Quick App

### ✅ In‑Memory Datastore

- Easiest possible persistence option
- Near‑zero latency lookups
- No schema or migrations
- Perfect for hackathon / prototype

### ✅ TanStack Table

- Extremely flexible & modular
- Easy cell editing + sorting + filtering
- More scalable than basic HTML tables

### ✅ OpenAI integration

- Very fast way to build intelligence into a prototype
- Supports iterative prompting

### ✅ Express + Vite

- Minimal boilerplate
- Familiar patterns
- Easy local development

> Overall: This stack minimizes **time‑to‑prototype**, while keeping a clean path to future scalability.

---

## Improvements We Could Make

### Reliability

- Persist to database
- Validate data types on import

### UX

- Rich filtering
- Chart visualizations

### Integration

- Multiple datasets per user
- Dataset versioning

### Testing

- Jest / Vitest unit tests

---

## Summary

This project demonstrates:

- File ingestion
- Tabular exploration + editing
- AI‑augmented data Q&A
- Clean minimal full‑stack architecture

It makes strong trade‑offs for **speed of development & clarity**, with clear paths to scalability.
