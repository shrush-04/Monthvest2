# MonthVest 💙
### Family Investment Dashboard

A modern fintech dashboard for tracking family investments, live stock prices, and portfolio performance.

---

## 🚀 Quick Start

### Step 1 — Install Node.js
Download and install Node.js (v18 or higher) from:
👉 https://nodejs.org

### Step 2 — Install dependencies
Open a terminal in this folder and run:
```bash
npm install
```

### Step 3 — Start the app
```bash
npm run dev
```

### Step 4 — Open in browser
Visit: **http://localhost:5173**

---

## 📁 Project Structure

```
monthvest/
├── public/
│   └── favicon.svg
├── src/
│   ├── MonthVest.jsx     ← Main app (all pages & components)
│   ├── main.jsx          ← React entry point
│   └── index.css         ← Tailwind + global styles
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

---

## ✨ Features

- **Landing Page** — Hero, features, stats, CTA with Get Started / Sign In buttons
- **Auth Modal** — Login & Register (frontend only, no backend needed)
- **Live Stock Ticker** — Scrolling NSE/BSE prices updating every 2 seconds
- **Dashboard** — Portfolio overview with pie, area, and bar charts
- **Family Members** — Member cards with drill-down investment view
- **Investments** — Filterable investment table with add form
- **Live Stocks** — Stock cards with sparklines + your stock holdings
- **Performance** — Yearly P&L trend and category breakdown charts
- **History** — Full investment history table

---

## 🛠 Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 | UI framework |
| Vite | Build tool & dev server |
| Tailwind CSS | Styling |
| Recharts | Charts (pie, line, bar, area) |

---

## 📦 Build for production

```bash
npm run build
```

Output goes to the `dist/` folder — ready to deploy to Netlify, Vercel, or any static host.

---

Made with 💙 for Indian families
