# Time Magazine Server (Express API)

Backend API for the Time Magazine project. Provides content endpoints, demo JWT auth, a project-based chat endpoint, and realtime updates via Server‑Sent Events (SSE).

## Requirements

- Node.js + npm

## Setup

```bash
cd server
npm install
cp .env.example .env
```

## Run (development)

```bash
npm run dev
```

Server runs at `http://localhost:5000` by default.

## Environment variables

`server/.env`:

```env
PORT=5000
CORS_ORIGIN=*
JWT_SECRET=change-me-in-real-env
```

### CORS_ORIGIN

- Use `*` in development (Vite port can change).
- For stricter config you can set a comma-separated list, e.g.:
  - `CORS_ORIGIN=http://localhost:5173,http://localhost:5174`

## Architecture

- `config/` app + env + cors config
- `routes/` API routes mounted under `/api`
- `controllers/` request handlers
- `services/` business logic (chat/ticker/auth/content)
- `models/` data access (currently in-memory)
- `middleware/` error handling + auth
- `utils/` helpers (async handler, http errors, text normalize)
- `data/` in-project seed content

## API

Base URL: `/api`

### Health

- `GET /api/health`

### Content

- `GET /api/categories`
- `GET /api/stories`
- `GET /api/stories/featured`
- `GET /api/stories/trending`

### Realtime (SSE)

- `GET /api/ticker/stream`
  - Event name: `ticker`
  - Payload: `{ "items": [...] }`
- `GET /api/ticker`

### Chat (project-based)

- `POST /api/chat`
  - Body: `{ "message": "trending" }`
  - Response: `{ "answer": "...", "sources": [...] }`

### Auth (demo JWT)

- `POST /api/auth/login`
  - Body: `{ "email": "...", "password": "..." }`
  - Response: `{ "user": {...}, "token": "..." }`
- `GET /api/auth/me`
  - Header: `Authorization: Bearer <token>`

## Scripts

- `npm run dev` - nodemon watcher
- `npm start` - run without watcher

## Troubleshooting

- **EADDRINUSE: 5000**: another process is using port 5000. Stop it or change `PORT`.
- **CORS**: set `CORS_ORIGIN=*` for local dev if your client port changes.

