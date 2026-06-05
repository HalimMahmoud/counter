# 🏆 Game Counter

A premium, interactive, offline-first Progressive Web App (PWA) designed to track live game scoreboards and match histories for individual and team play. Built with a high-fidelity gaming aesthetic, micro-interactions, reactive state, and full local persistence.

👉 **Live Demo:** [https://HalimMahmoud.github.io/counter](https://HalimMahmoud.github.io/counter)

---

## ✨ Features

- 🎮 **Individual & Team Modes** – Track 1v1 matchups or multi-player team games with customized roster configurations.
- ⚡ **Real-Time Scoreboard Arena** – Dynamic score controls, quick resetting, interactive custom avatars, and live match feeds.
- 📜 **Live Activity Logs** – Chronological scrollable history feed of score changes with timestamps.
- 🗄️ **Local State Persistence** – Save configurations and active scores across reloads via local storage, featuring a dynamic save indicator and safe persistence toggle controls.
- 🎨 **Premium Cyberpunk/Gaming Aesthetic** – Dark/Light mode theme toggle, glassmorphism card layouts, subtle PlayStation-themed graphic accents, and micro-animations.
- 📱 **Progressive Web App (PWA)** – Installable as a standalone app with offline support, service worker precaching, and native OS app shortcuts (quick-links to Players or Teams setup).

---

## 🛠️ Architecture & Tech Stack

- **Core Framework:** [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tooling:** [Vite 8](https://vite.dev/) (PWA-enabled via `vite-plugin-pwa`)
- **Styling System:** [Tailwind CSS v4](https://tailwindcss.com/) (fully CSS-first, modern variables, fluid animations)
- **State Management:** [Valtio](https://github.com/pmndrs/valtio) (proxy-based, mutable-styled reactive state store)
- **Routing:** [React Router v7](https://reactrouter.com/) (hash-based routing for GitHub Pages compatibility)
- **Testing Suite:** [Vitest](https://vitest.dev/) (unit and router integration tests)
- **Maintainability:** [Fallow](https://docs.fallow.tools/) (complexity and dependency analyzer; maintains a **99 A** health rating)

---

## ⚡ Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/HalimMahmoud/counter.git
cd counter
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run the Development Server
```bash
npm run dev
```

### 4. Build and Preview for Production
```bash
npm run build
npm run preview
```

### 5. Run the Test Suite
```bash
npx vitest run
```

### 6. Verify Code Quality (Fallow)
```bash
npx fallow --score
```

---

## 📦 Deployment

The project is configured to build and deploy to GitHub Pages automatically:
```bash
npm run deploy
```
This executes `predeploy` (`npm run build`) to generate PWA assets, sets up the manifest version dynamically, and pushes the build to the `gh-pages` branch.
