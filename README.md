# ⚡ Super App — Frontend Challenge

A multi-feature React dashboard that consolidates weather, news, entertainment, productivity tools, and user personalization into a single cohesive web application.

---

## 🔗 Links

- **Live Demo:** [super-app-two-delta.vercel.app](https://super-app-two-delta.vercel.app)
- **GitHub:** [github.com/Meghana-110403/super-app](https://github.com/Meghana-110403/super-app)

---

## 📸 Features

### 1. 🔐 Registration & Validation
- Multi-field form with Name, Username, Email, and Mobile Number
- Real-time inline validation with error messages
- Alphabetic check for name, alphanumeric for username
- RFC-standard email regex validation
- Strict 10-digit mobile number validation
- Navigation blocked until all fields are valid

### 2. 🎬 Category Selection
- 8 entertainment categories: Action, Comedy, Drama, Music, Sports, Thriller, Fantasy, Romance
- Interactive toggle cards with color-coded hover animations
- Minimum 3 categories required to proceed
- Continue button disabled until threshold is met

### 3. 📊 Super Dashboard
- **👤 User Profile Widget** — Displays registration data and selected category chips
- **🌤 Weather Widget** — Live weather via OpenWeatherMap API with geolocation support, shows temperature, humidity, wind speed, pressure, and condition icons. City search included.
- **📰 News Feed Widget** — Auto-rotating news articles every 3 seconds, pauses on hover, dot navigation
- **⏱ Timer Widget** — Countdown timer with Hours/Minutes/Seconds input, circular progress ring, start/pause/resume/reset controls
- **📝 Notes Widget** — Persistent notes saved to localStorage, word/character count, clear and save actions

### 4. 🎥 Entertainment Discovery
- Movie cards fetched from OMDB API based on selected categories
- Horizontal scrollable rows per category
- Hover animations with scale and shadow effects
- Detailed movie modal with poster, plot, cast, rating, runtime, genre, and awards

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| UI Library | React 18 |
| Build Tool | Vite |
| Routing | React Router DOM v6 |
| State Management | Zustand |
| HTTP Client | Axios |
| Styling | Custom CSS (no UI libraries) |
| Fonts | Space Grotesk + Inter |
| Deployment | Vercel |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── UserProfileWidget.jsx   # User profile display
│   ├── WeatherWidget.jsx       # Live weather data
│   ├── NewsWidget.jsx          # Auto-rotating news feed
│   ├── TimerWidget.jsx         # Countdown timer with ring UI
│   ├── NotesWidget.jsx         # Persistent notes
│   ├── MovieCard.jsx           # Movie card with hover animation
│   └── MovieModal.jsx          # Full movie detail overlay
├── pages/
│   ├── Register.jsx            # Step 1 — Registration form
│   ├── Categories.jsx          # Step 2 — Category selection
│   ├── Dashboard.jsx           # Step 3 — Main dashboard
│   └── Movies.jsx              # Step 4 — Entertainment page
├── routes/
│   └── AppRoutes.jsx           # Route config + protected routes
├── services/
│   └── apiServices.js          # Weather / Movie API integration
├── store/
│   └── useStore.js             # Zustand global state
├── App.jsx
├── main.jsx
└── index.css                   # Global design tokens + base styles
```

---

## 🚀 Setup & Installation

### Prerequisites
- Node.js v18+
- npm

### 1. Clone the repository
```bash
git clone https://github.com/Meghana-110403/super-app.git
cd super-app/super-app
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure API Keys
```bash
cp .env.example .env
```

Edit `.env` with your keys:
```
VITE_WEATHER_API_KEY=your_openweathermap_key
VITE_NEWS_API_KEY=your_news_api_key
VITE_MOVIE_API_KEY=your_omdb_key
```

| API | Get Key From |
|---|---|
| Weather | [openweathermap.org/api](https://openweathermap.org/api) |
| Movies | [omdbapi.com](https://www.omdbapi.com) |

### 4. Run locally
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### 5. Build for production
```bash
npm run build
```

---

## 🌐 Deployment (Vercel)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) → Import repository
3. Set Root Directory to `super-app`
4. Add environment variables in Vercel dashboard
5. Deploy

---

## 🎨 Design System

- **Theme:** Dark mode with custom CSS variables
- **Primary Font:** Space Grotesk (headings)
- **Body Font:** Inter
- **Accent Color:** `#6c63ff` (purple)
- **Secondary Accent:** `#00d4aa` (teal)
- **Responsive:** Mobile, Tablet, Desktop breakpoints
- **Animations:** Fade in, slide up, scale, hover transitions
- **Accessibility:** `prefers-reduced-motion` respected, ARIA labels, keyboard navigation

---

## 📋 Assignment Requirements Checklist

- ✅ Registration form with full validation
- ✅ Category selection with minimum 3 threshold
- ✅ Protected routes (can't skip steps)
- ✅ User Profile widget
- ✅ Live Weather API integration with geolocation
- ✅ Auto-rotating News Feed (every 3 seconds)
- ✅ Countdown Timer (start/pause/resume/reset)
- ✅ Notes with localStorage persistence
- ✅ Movie recommendations by selected categories
- ✅ Hover animations on movie cards
- ✅ Movie detail modal popup
- ✅ Zustand state management
- ✅ No UI component libraries used
- ✅ Responsive design
- ✅ Deployed on Vercel

---

## 👩‍💻 Developer

**Meghana** — [github.com/Meghana-110403](https://github.com/Meghana-110403)

---

*Built for the Mark Anthony Frontend Challenge*
