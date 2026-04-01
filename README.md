# Sarthak Khalasi — Portfolio

A stunning, production-ready personal portfolio built with **React 18**, **Vite**, **Framer Motion**, **Three.js**, and **GSAP**. This project features a high-performance, modern tech stack for a premium user experience.

---

## ✨ Features

| Feature | Details |
|---------|---------|
| 🎨 **Design** | Dark theme with glassmorphism, glowing auras, and modern accents |
| 🌐 **3D Visuals** | Global 3D background powered by **Three.js** and **React Three Fiber** |
| 🔠 **Typography** | Playfair Display + DM Sans + JetBrains Mono |
| 🎬 **Animations** | Scroll-triggered reveals via **GSAP** and micro-interactions with **Framer Motion** |
| 📜 **Smooth Scroll** | Inertial scrolling implemented with **Lenis** |
| 🖱️ **Custom Cursor** | Dynamic interactive cursor that reacts to hover states |
| 🤖 **AI Assistant** | Integrated AI Assistant component for interactive user engagement |
| 📱 **Responsive** | Fully optimized for mobile, tablet, and desktop |

---

## 🚀 Getting Started

This project is built with **Vite** for ultra-fast development.

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build
npm run preview
```

The app will open at **http://localhost:3000** (or the port specified by Vite).

---

## 🗂 Project Structure

```
src/
├── main.jsx                 # Entry point (Vite)
├── App.jsx                  # Root component
├── components/
│   ├── Navbar.jsx           # Responsive navigation
│   ├── Hero.jsx             # Full-viewport landing with 3D elements
│   ├── About.jsx            # Bio + stats + info
│   ├── Skills.jsx           # Tech stack grid
│   ├── Projects.jsx         # Modern project cards
│   ├── Contact.jsx          # Contact form
│   ├── ThreeBackground.jsx  # Three.js canvas & scenes
│   └── ...                  # Other interactive components
└── styles/
    ├── global.css           # Design tokens, reset, utilities
    └── *.module.css         # Component-scoped styling
```

---

## 📦 Key Dependencies

| Package | Purpose |
|---------|---------|
| `vite` | Next-generation frontend tooling |
| `react` `react-dom` | Core UI library |
| `@react-three/fiber` | Three.js renderer for React |
| `gsap` | High-performance scroll & timeline animations |
| `framer-motion` | Smooth UI transitions & gestures |
| `lenis` | Modern smooth scrolling engine |
| `react-icons` | Premium icon sets (Fi, Si) |

---

## 🎨 Customization

1. **Colors** — Edit CSS variables in `src/styles/global.css`
2. **3D Scenes** — Modify `ThreeBackground.jsx` to change the background visuals
3. **Content** — Update data in respective components (e.g., `Projects.jsx`, `Skills.jsx`)
4. **GSAP Config** — Adjust scroll triggers in `App.jsx`

---

## 📸 Core Sections

1. **Hero** — 3D-enhanced landing with dynamic role cycling
2. **About** — Professional bio with integrated stats
3. **Capabilities** — Detailed breakdown of core services/expertise
4. **Education & Experience** — High-end timeline for professional history
5. **Skills** — Interactive grid of technologies
6. **Projects** — Featured work with immersive hover effects
7. **Contact** — Premium form with integrated social links
8. **AI Assistant** — Interactive layer for personalized engagement

---

## 📄 License
This project is for personal use as a portfolio template.
