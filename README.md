# Altyn Gold Platform

Government-backed gold investment platform for Kyrgyzstan.

## Quick Start (Development)

```bash
# Frontend (Terminal 1)
npm install
npm run dev          # → http://localhost:5173

# Backend (Terminal 2)
cd server
npm install
npm run dev          # → http://localhost:3001
```

## Quick Start (Docker — Full Stack)

```bash
docker-compose up --build
# Frontend → http://localhost
# Backend  → http://localhost:3001
# MongoDB  → localhost:27017
```

## Architecture

```
Altyn/
├── src/                    # React Frontend (Vite + Tailwind)
│   ├── components/         # UI components + auth
│   ├── pages/              # Dashboard, Market, Transfers, Settings
│   └── lib/                # API client, utilities
├── server/                 # Express.js Backend
│   └── src/
│       ├── lib/            # Core: errors, logger, validation, DB
│       ├── middleware/      # JWT auth guard
│       └── modules/        # auth, gold, portfolio
├── docker-compose.yml      # Full stack orchestration
├── Dockerfile.frontend     # Frontend production build
├── nginx.conf              # Reverse proxy config
└── SKILL_BACK.md           # Backend patterns reference
```

## API Endpoints

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | /api/auth/register | — | Create account |
| POST | /api/auth/login | — | Login + JWT |
| GET | /api/auth/me | JWT | User profile |
| GET | /api/gold/price | — | Current gold price |
| GET | /api/gold/history | — | 30-day price chart |
| GET | /api/gold/stats | — | Market statistics |
| GET | /api/portfolio | JWT | User balance |
| POST | /api/portfolio/buy | JWT | Buy gold |
| POST | /api/portfolio/sell | JWT | Sell gold |
| GET | /api/portfolio/transactions | JWT | History |

## Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Framer Motion
- **Backend**: Express.js, TypeScript, Zod, JWT
- **Database**: MongoDB 7 (or in-memory fallback)
- **DevOps**: Docker, nginx, docker-compose
