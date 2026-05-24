# 📊 Expense Tracker (PWA & Bilingual)

A modern, high-performance financial tracking web application built using clean, vanilla JavaScript. This project is optimized to provide a seamless User Experience (UX) across desktop and mobile browsers, featuring full dynamic localization, data persistence, and offline capabilities.

## 🚀 Live Demo
You can view and test the live application here: **https://m7mdjbr.github.io/Expense-Tracker/**

---

## ✨ Key Features

- **🌍 Full Dynamic Bilingual Support (Arabic/English):** Switches seamlessly on the fly. It doesn't just swap text; it dynamically alters the HTML layout orientation (`dir="rtl"` and `dir="ltr"`) and updates accessibility properties according to the selected language.
- **💾 Data Persistence (Local Storage):** Your transactions are saved locally in the client's web storage. Data is preserved even after a page refresh or browser restart.
- **📱 Progressive Web App (PWA) Support:** - Fully installable on Android, iOS, and Desktop.
  - Implements a dedicated **Service Worker** (`sw.js`) to cache application assets (`HTML`, `CSS`, `JS`, icons, manifest).
  - Works entirely **Offline** without an active internet connection.
- **🎨 Modern Responsive UI:**
  - Designed completely with **CSS Grid** and **Flexbox** layouts.
  - Implements the cutting-edge CSS `:has()` relational pseudo-class to style custom interactive radio buttons without injecting complex JavaScript state styles.
  - Clean layout containing custom color-coded badges for Income (+) vs. Expenses (-).

---

## 🛠️ Tech Stack & Concepts Used

- **HTML5:** Semantic architecture containing native validation attributes.
- **CSS3:** Custom properties (Variables) for fluid color scheming, animations (`keyframes`), and modern responsive queries.
- **Vanilla JavaScript (ES6+):** - DOM Manipulation & Traversal.
  - State computation algorithms (reducing transaction histories into total balances, income, and expenses).
  - Storage API Management (`JSON.parse` and `JSON.stringify`).
  - Async PWA Initialization (`navigator.serviceWorker`).

---

## 📁 Project Directory Structure

```text
├── index.html       # Application Entry Point & Document Object Framework
├── style.css        # Layout structure, Variables, Theme management
├── script.js       # Core application engine, Translations, State controllers
├── manifest.json   # Web App Manifest containing parameters for installability
├── sw.js           # PWA Service worker managing fetch events & asset caching
└── icon-512.png    # High-resolution application brand identity icon
