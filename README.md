<div align="center">

# ⛳ Family Golf — Sidcup Family Golf Experience

<img src="https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=1200&h=400&fit=crop&crop=center" alt="Golf Course Banner" width="100%" style="border-radius: 12px;" />

<br/>

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Live-brightgreen?style=for-the-badge)]()

*A modern, animated landing page for Sidcup Family Golf — delivering an immersive, scroll-driven experience with GSAP animations, custom cursor effects, and a responsive design.*

---

</div>

## 🎯 Project Goal

Build a **production-ready, visually stunning landing page** for a family golf facility that captures the energy and fun of the venue. The site leverages cutting-edge scroll animations and interactive UI to keep visitors engaged and drive footfall to the venue.

## 📌 Purpose

- Showcase the golf facility's services — driving range, adventure golf, lessons, and café
- Create a memorable first impression with cinematic hero video and smooth animations
- Provide visitors with quick access to key information and calls to action
- Demonstrate modern frontend development techniques with GSAP & ScrollTrigger

## 🔭 Scope

| Area | Details |
|------|---------|
| **Type** | Static frontend website |
| **Target Audience** | Families, golf enthusiasts, local visitors |
| **Deployment** | Docker (Nginx) / Static hosting |
| **Browser Support** | Chrome, Firefox, Edge, Safari (modern) |

---

## ✨ Features

<div align="center">
<table>
<tr>
<td align="center" width="25%">
<img src="https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=300&h=200&fit=crop" width="100%" alt="Golf Driving Range" style="border-radius:8px;" /><br/>
<b>🏌️ TopTracer Range</b><br/>
46-bay floodlit driving range with TopTracer technology
</td>
<td align="center" width="25%">
<img src="https://images.unsplash.com/photo-1596727362302-b8d891c42ab8?w=300&h=200&fit=crop" width="100%" alt="Adventure Golf" style="border-radius:8px;" /><br/>
<b>🦕 Adventure Golf</b><br/>
Two 18-hole dinosaur themed crazy golf courses
</td>
<td align="center" width="25%">
<img src="https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?w=300&h=200&fit=crop" width="100%" alt="Golf Lessons" style="border-radius:8px;" /><br/>
<b>📚 Golf Lessons</b><br/>
Professional coaching for all skill levels
</td>
<td align="center" width="25%">
<img src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300&h=200&fit=crop" width="100%" alt="Coffee Shop" style="border-radius:8px;" /><br/>
<b>☕ Coffee Shop</b><br/>
On-site café for refreshments and relaxation
</td>
</tr>
</table>
</div>

### 🎨 Technical Features

- **🎥 Cinematic Hero Video** — Full-screen looping background video
- **🖱️ Custom Cursor** — Interactive green cursor with blur trail effect
- **📜 Scroll Animations** — GSAP ScrollTrigger-powered parallax and reveal effects
- **♻️ Infinite Scroller** — Auto-scrolling marquee banner with hover effects
- **🃏 Interactive Cards** — 3D rotation hover effects with overlay reveals
- **📱 Responsive Navbar** — Shrinks and changes color on scroll
- **🎨 Brand Colors** — Consistent `#95C11E` green theme throughout

---

## 🖼️ Preview

<div align="center">

| Hero Section | Services Scroller |
|:---:|:---:|
| <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&h=300&fit=crop" width="400" alt="Hero Preview" /> | <img src="https://images.unsplash.com/photo-1622819584099-e04ccb14e8a7?w=500&h=300&fit=crop" width="400" alt="Services Preview" /> |

| Interactive Cards | Footer Section |
|:---:|:---:|
| <img src="https://images.unsplash.com/photo-1632932693687-51f0be07868a?w=500&h=300&fit=crop" width="400" alt="Cards Preview" /> | <img src="https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=500&h=300&fit=crop" width="400" alt="Footer Preview" /> |

</div>

---

## 📂 Project Structure

```
Family-Golf/
├── golfproject.html      # Main HTML page
├── golfproject.css       # Styles, animations, responsive layout
├── golfproject.js        # GSAP animations & custom cursor logic
├── package.json          # Project metadata & dev scripts
├── Dockerfile            # Nginx Alpine container config
├── docker-compose.yml    # One-command Docker deployment
├── nginx.conf            # Nginx server configuration
├── .dockerignore         # Docker build exclusions
└── README.md             # You are here!
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16+) — for local dev server
- **Docker** (optional) — for containerized deployment

### 🏃 Run Locally

```bash
# Clone the repository
git clone https://github.com/aleemrana8/Family-Golf.git
cd Family-Golf

# Start dev server
npx serve -s . -l 3000
```

🔗 Open **http://localhost:3000/golfproject.html**

### 🐳 Run with Docker

```bash
# Clone the repository
git clone https://github.com/aleemrana8/Family-Golf.git
cd Family-Golf

# Build & start container
docker compose up --build -d
```

🔗 Open **http://localhost:8080**

---

## 🛠️ Tech Stack

<div align="center">

| Technology | Purpose |
|:---:|:---:|
| ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white) | Page structure & semantics |
| ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white) | Styling, animations & layout |
| ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black) | Interactivity & cursor effects |
| ![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=flat-square&logo=greensock&logoColor=white) | Scroll-triggered animations |
| ![Nginx](https://img.shields.io/badge/Nginx-009639?style=flat-square&logo=nginx&logoColor=white) | Production web server |
| ![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white) | Containerized deployment |
| ![Google Fonts](https://img.shields.io/badge/Google_Fonts-4285F4?style=flat-square&logo=google&logoColor=white) | Montserrat typography |
| ![Remix Icons](https://img.shields.io/badge/Remix_Icons-2F3337?style=flat-square&logo=remixicon&logoColor=white) | UI iconography |

</div>

---

## 🌐 External Resources

- **Video**: [Sidcup Family Golf Hero Video](https://sidcupfamilygolf.com)
- **Animations**: [GSAP v3.12](https://gsap.com/) + [ScrollTrigger Plugin](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
- **Fonts**: [Google Fonts — Montserrat](https://fonts.google.com/specimen/Montserrat)
- **Icons**: [Remix Icon v3.4](https://remixicon.com/)

---

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

### ⭐ Star this repo if you found it useful!

<img src="https://images.unsplash.com/photo-1592919505780-303950717480?w=800&h=250&fit=crop&crop=center" alt="Golf Sunset" width="80%" style="border-radius: 12px;" />

**Made with ❤️ by [Aleem Rana](https://github.com/aleemrana8)**

</div>
