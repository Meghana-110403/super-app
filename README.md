# ⚡ Super App

A multi-feature React dashboard combining user registration, category selection, live weather, rotating news, countdown timer, persistent notes, and movie recommendations — all in one personalized app.

## Live Demo
> https://super-app-two-delta.vercel.app/

## Features

- **Registration** — Validated form (Name, Username, Email, Mobile)
- **Category Selection** — 8 entertainment genres; minimum 3 required
- **Dashboard**
  - 👤 User Profile widget
  - 🌤 Live Weather (OpenWeatherMap, geolocation + city search)
  - 📰 Auto-rotating News Feed (every 3 seconds, pauses on hover)
  - ⏱ Countdown Timer (H:M:S with start/pause/resume/reset)
  - 📝 Persistent Notes (localStorage)
- **Entertainment Discovery** — Movies by genre (OMDB API) with detail modals

## Tech Stack

| Layer | Tech |
|---|---|
| UI Library | React 18 + Vite |
| Routing | React Router DOM v6 |
| State | Zustand |
| HTTP | Axios |
| Styling | Custom CSS (no component libraries) |
| Fonts | Space Grotesk + Inter (Google Fonts) |

## Setup

### 1. Clone & Install

```bash
git clone https://github.com/YOUR_USERNAME/super-app.git
cd super-app
npm install
```

### 2. Configure API Keys

```bash
cp .env.example .env
```

Edit `.env` and add your keys:

| Key | Where to get it |
|---|---|
| `VITE_WEATHER_API_KEY` | [openweathermap.org/api](https://openweathermap.org/api) — Free tier works |
| `VITE_NEWS_API_KEY` | [newsapi.org](https://newsapi.org) — Free developer key |
| `VITE_MOVIE_API_KEY` | [omdbapi.com](https://www.omdbapi.com) — Free API key |

### 3. Run

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### 4. Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── UserProfileWidget.jsx   # Profile display
│   ├── WeatherWidget.jsx       # Live weather data
│   ├── NewsWidget.jsx          # Auto-rotating news
│   ├── TimerWidget.jsx         # Countdown timer
│   ├── NotesWidget.jsx         # Persistent notes
│   ├── MovieCard.jsx           # Movie card with hover animation
│   └── MovieModal.jsx          # Full movie detail overlay
├── pages/
│   ├── Register.jsx            # Step 1 — User registration
│   ├── Categories.jsx          # Step 2 — Category selection
│   ├── Dashboard.jsx           # Step 3 — Main dashboard
│   └── Movies.jsx              # Step 4 — Entertainment page
├── routes/
│   └── AppRoutes.jsx           # Route config + protection
├── services/
│   └── apiServices.js          # Weather / News / Movie API
├── store/
│   └── useStore.js             # Zustand global state
├── App.jsx
├── main.jsx
└── index.css                   # Global design tokens + base styles
```

## Deployment

### Vercel (recommended)
```bash
npm install -g vercel
vercel
```
Set your environment variables in the Vercel dashboard under Project → Settings → Environment Variables.

### Netlify
```bash
npm run build
# Drag & drop the dist/ folder to Netlify
```
Add environment variables under Site settings → Build & deploy → Environment.

## Design Notes

- Dark mode only with a custom design token system (`--color-bg`, `--color-accent`, etc.)
- Space Grotesk for display headings, Inter for body
- Accent purple (#6c63ff) with teal highlights (#00d4aa)
- Responsive grid: 3-col dashboard → 2-col on tablet → stacked on mobile
- All animations respect `prefers-reduced-motion`

## API Notes

> **Important**: The NewsAPI free tier does **not** support browser requests due to CORS restrictions. For development, either:
> - Use a CORS proxy in development
> - Upgrade to a paid NewsAPI plan
> - Switch to [World News API](https://worldnewsapi.com) which supports CORS
> - Use the mock news fallback (edit `apiServices.js` to return mock data)

---

Built for the Mark Anthony Frontend Challenge.
