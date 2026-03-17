# Sarthak Khalasi — Portfolio

A stunning, production-ready personal portfolio built with **React 18**, **Framer Motion**, and custom CSS Modules. Replicates the design and interactivity of [sarthakkhalasi.vercel.app](https://sarthakkhalasi.vercel.app/).

---

## ✨ Features

| Feature | Details |
|---------|---------|
| 🎨 **Design** | Dark theme with warm gold accents and soft rose highlights |
| 🔠 **Typography** | Playfair Display + DM Sans + JetBrains Mono |
| 🎬 **Animations** | Scroll-triggered entry animations via Framer Motion |
| ✍️ **Typewriter** | Animated role cycling in the Hero section |
| 📱 **Responsive** | Mobile, tablet, and desktop breakpoints |
| 🍔 **Mobile Menu** | Animated hamburger overlay navigation |
| 📊 **Skills** | Categorized tech stack with animated progress bars |
| 🃏 **Projects** | Filterable cards with hover overlays & links |
| 📬 **Contact** | Validated form with loading and success states |
| 🔗 **Smooth Scroll** | `react-scroll` for section navigation |
| 🌫️ **Backdrop FX** | Noise texture, grid patterns, glow blobs |

---

## 🗂 Project Structure

```
src/
├── App.js                   # Root component
├── index.js                 # Entry point
├── components/
│   ├── Navbar.js            # Responsive navigation
│   ├── Hero.js              # Full-viewport landing
│   ├── About.js             # Bio + stats + info
│   ├── Skills.js            # Tech stack grid + bars
│   ├── Projects.js          # Filterable project cards
│   ├── Contact.js           # Contact form + info
│   └── Footer.js            # Footer with links
└── styles/
    ├── global.css           # CSS variables, reset, utilities
    ├── Navbar.module.css
    ├── Hero.module.css
    ├── About.module.css
    ├── Skills.module.css
    ├── Projects.module.css
    ├── Contact.module.css
    └── Footer.module.css
```

---

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm start

# 3. Build for production
npm run build
```

The app will open at **http://localhost:3000**

---

## 📦 Key Dependencies

| Package | Purpose |
|---------|---------|
| `react` `react-dom` | Core React |
| `react-router-dom` | Client-side routing |
| `framer-motion` | Animations & transitions |
| `react-scroll` | Smooth section scrolling |
| `react-icons` | Icon library (Si, Fi sets) |

---

## 🎨 Customisation

1. **Colors** — Edit CSS variables in `src/styles/global.css`
2. **Content** — Update project data in `Projects.js`, skills in `Skills.js`
3. **Profile photo** — Replace the SVG placeholder in `About.js` with an `<img>` tag
4. **Contact** — Integrate [EmailJS](https://emailjs.com) in `Contact.js` for real email sending
5. **Resume** — Add your PDF as `public/resume.pdf`

---

## 📸 Sections

1. **Hero** — Animated name, typewriter role, CTA buttons, social links
2. **About** — Profile avatar, bio, stats, info grid, download resume
3. **Skills** — Four category blocks with animated progress bars
4. **Projects** — Six projects with filter tabs, hover overlays, live/GitHub links
5. **Contact** — Contact form with validation + info cards
6. **Footer** — Quick nav, social icons, copyright

---

*Built with ♥ — React 18 + Framer Motion + CSS Modules*
