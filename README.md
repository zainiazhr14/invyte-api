# 🪶 ElysiaJS Backend Boilerplate

A modular backend boilerplate built with **[ElysiaJS](https://elysiajs.com)**, **TypeScript**, and **Drizzle ORM**.  
Designed for clean architecture, scalability, and clarity.

---

## 📁 Folder Structure
src/
├── config/ # App & environment configuration
│ └── env.ts
│
├── db/ # Database setup using Drizzle ORM
│ ├── schemas/ # Database schemas
│ ├── drizzle.config.ts
│ └── index.ts
│
├── libs/ # Shared utilities and helper functions
│
├── modules/ # Domain-based feature modules
│
├── template/ # Email templates or static text templates
│
├── app.ts # Main Elysia app configuration
└── index.ts # App entry point

---

## 🚀 Getting Started

### Install dependencies

```bash
pnpm install
# or
npm install

```

### Migration
```bash
bunx drizzle-kit generate --config=src/db/drizzle.config.ts
bunx drizzle-kit migrate --config=src/db/drizzle.config.ts
```

### Copy environment variables
cp .env.sample .env


### Running on Development mode
bun run dev
# or
pnpm dev

### Running on Production mode
bun run start
# or
pnpm start

