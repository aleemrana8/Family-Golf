<div align="center">

# ⛳ Family Golf — Full-Stack Golf Experience Platform

<img src="https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=1200&h=400&fit=crop&crop=center" alt="Golf Course Banner" width="100%" />

<br/>

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-B4CA65?style=for-the-badge&logo=ejs&logoColor=black)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Production_Ready-brightgreen?style=for-the-badge)]()
[![API](https://img.shields.io/badge/REST_API-Included-blue?style=for-the-badge)]()

**A modern full-stack web application for Sidcup Family Golf — featuring online booking, contact forms, newsletter subscriptions, customer reviews, GSAP scroll animations, and a SQLite-powered backend. No `.html` extensions — clean server-side routing throughout.**

[Live Demo](#-getting-started) · [API Docs](#-api-endpoints) · [Docker Setup](#-run-with-docker)

---

</div>

## 🎯 Project Goal

Build a **production-ready, full-stack golf facility platform** that goes beyond a static landing page. The application provides real functionality — online booking, customer engagement through reviews and newsletters, contact management — all powered by an Express.js backend with SQLite persistence.

## 📌 Purpose

| Purpose | Description |
|---------|-------------|
| **Customer Booking** | Allow visitors to reserve driving range slots, golf lessons, adventure golf and party packages online |
| **Customer Engagement** | Newsletter subscriptions and review system to build community |
| **Information Hub** | Showcase all services — TopTracer range, adventure golf, lessons, café |
| **Contact Management** | Structured contact form with server-side storage |
| **Immersive UX** | Cinematic hero video, GSAP scroll animations, custom cursor effects |

## 🔭 Scope

| Area | Details |
|------|---------|
| **Type** | Full-stack web application (Node.js + Express + SQLite) |
| **Frontend** | EJS templates, GSAP animations, responsive CSS |
| **Backend** | Express.js REST API with server-side rendering |
| **Database** | SQLite (via sql.js — zero native dependencies) |
| **Pages** | Home, Golf Lessons, Adventure Golf, Book Now, Contact |
| **API Routes** | Bookings, Contact, Newsletter, Reviews |
| **Deployment** | Docker / Node.js |

---

## ✨ Features

<div align="center">
<table>
<tr>
<td align="center" width="25%">
<img src="https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=300&h=200&fit=crop" width="100%" alt="Driving Range" /><br/>
<b>🏌️ Online Booking System</b><br/>
Book driving range, lessons, adventure golf & parties with instant confirmation
</td>
<td align="center" width="25%">
<img src="https://images.unsplash.com/photo-1596727362302-b8d891c42ab8?w=300&h=200&fit=crop" width="100%" alt="Adventure Golf" /><br/>
<b>🦕 Adventure Golf Pages</b><br/>
Dedicated pages for Jurassic & Volcano courses with pricing
</td>
<td align="center" width="25%">
<img src="https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?w=300&h=200&fit=crop" width="100%" alt="Golf Lessons" /><br/>
<b>📚 Lesson Catalog</b><br/>
Private, group, junior & video analysis lessons with booking links
</td>
<td align="center" width="25%">
<img src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300&h=200&fit=crop" width="100%" alt="Reviews" /><br/>
<b>⭐ Review System</b><br/>
Customers submit reviews, moderation system, star ratings
</td>
</tr>
</table>
</div>

### 🖥️ Full-Stack Features

| Feature | Frontend | Backend |
|---------|----------|---------|
| **🗓️ Online Booking** | Form with date/time picker, activity selector | `POST /api/bookings` — validates & stores in SQLite |
| **📧 Newsletter** | Inline subscribe form with live feedback | `POST /api/newsletter` — deduplicates emails |
| **📞 Contact Form** | Full contact page with Google Maps embed | `POST /api/contact` — stores messages |
| **⭐ Reviews** | Star rating cards on homepage, submit form on contact page | `GET/POST /api/reviews` — CRUD with moderation |
| **🎥 Hero Video** | Full-screen cinematic looping background | Served as static asset |
| **🖱️ Custom Cursor** | Interactive green cursor with glow trail | Pure JS, no library |
| **📜 GSAP Animations** | ScrollTrigger parallax, card reveals, marquee | Client-side GSAP v3.12 |
| **📱 Responsive** | Mobile nav toggle, stacked layouts | EJS conditional rendering |
| **🔒 Security** | Input validation, CSRF-safe forms | Helmet, rate limiting, parameterized queries |

---

## 🖼️ Pages Preview

<div align="center">

| 🏠 Home — Hero & Marquee | 📚 Lessons — Course Catalog |
|:---:|:---:|
| <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&h=300&fit=crop" width="400" alt="Home Page" /> | <img src="https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?w=500&h=300&fit=crop" width="400" alt="Lessons Page" /> |

| 🗓️ Book Now — Reservation Form | 📞 Contact — Form & Map |
|:---:|:---:|
| <img src="https://images.unsplash.com/photo-1632932693687-51f0be07868a?w=500&h=300&fit=crop" width="400" alt="Booking Page" /> | <img src="https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=500&h=300&fit=crop" width="400" alt="Contact Page" /> |

</div>

---

## 📂 Project Structure

```
Family-Golf/
├── src/                    # Backend source code
│   ├── server.js           # Express app entry point
│   ├── routes/
│   │   ├── pages.js        # Page routes (/, /lessons, /book, etc.)
│   │   └── api.js          # REST API routes (/api/*)
│   ├── db/
│   │   └── database.js     # SQLite database (sql.js)
│   └── middleware/          # Custom middleware (extensible)
├── views/                  # EJS templates
│   ├── home.ejs            # Homepage with reviews
│   ├── lessons.ejs         # Golf lessons catalog
│   ├── adventure.ejs       # Adventure golf courses
│   ├── book.ejs            # Booking form
│   ├── contact.ejs         # Contact form + reviews
│   ├── 404.ejs             # Not found page
│   ├── error.ejs           # Server error page
│   └── partials/
│       ├── header.ejs      # Shared nav & head
│       └── footer.ejs      # Shared footer & scripts
├── public/                 # Static assets
│   ├── css/style.css       # Full stylesheet (~700 lines)
│   └── js/app.js           # GSAP animations + form handlers
├── data/                   # SQLite database (auto-created)
├── package.json            # Dependencies & scripts
├── Dockerfile              # Node.js Alpine container
├── docker-compose.yml      # Docker Compose with volume
├── nginx.conf              # Nginx config (for reverse proxy)
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+ ([download](https://nodejs.org))
- **Docker** (optional, for containerized deployment)

### 🏃 Run Locally

```bash
# Clone the repository
git clone https://github.com/aleemrana8/Family-Golf.git
cd Family-Golf

# Install dependencies
npm install

# Start the server
npm start
```

🔗 **Open http://localhost:3000** — No `.html` needed!

| Page | URL |
|------|-----|
| Home | http://localhost:3000 |
| Golf Lessons | http://localhost:3000/lessons |
| Adventure Golf | http://localhost:3000/adventure |
| Book Now | http://localhost:3000/book |
| Contact Us | http://localhost:3000/contact |

### 🐳 Run with Docker

```bash
git clone https://github.com/aleemrana8/Family-Golf.git
cd Family-Golf

docker compose up --build -d
```

🔗 **Open http://localhost:3000**

---

## 📡 API Endpoints

All API routes return JSON responses with `{ success, message, data? }` format.

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| `GET` | `/api/reviews` | Get approved reviews | — |
| `POST` | `/api/reviews` | Submit a review | `{ name, rating, comment }` |
| `POST` | `/api/bookings` | Create a booking | `{ name, email, phone, date, time, activity, guests?, notes? }` |
| `GET` | `/api/bookings` | List all bookings | — |
| `POST` | `/api/contact` | Send a message | `{ name, email, subject, message }` |
| `POST` | `/api/newsletter` | Subscribe to newsletter | `{ email }` |

### Example — Create a Booking

```bash
curl -X POST http://localhost:3000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@mail.com","phone":"07123456789","date":"2026-06-01","time":"10:00","activity":"driving-range","guests":2}'
```

```json
{ "success": true, "message": "Booking confirmed! We'll send a confirmation to your email." }
```

---

## 🛠️ Tech Stack

<div align="center">

| Layer | Technology | Purpose |
|:---:|:---:|:---:|
| **Runtime** | ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white) | Server runtime |
| **Framework** | ![Express](https://img.shields.io/badge/Express-000?style=flat-square&logo=express&logoColor=white) | Web framework & routing |
| **Database** | ![SQLite](https://img.shields.io/badge/SQLite-003B57?style=flat-square&logo=sqlite&logoColor=white) | Persistent data storage |
| **Templating** | ![EJS](https://img.shields.io/badge/EJS-B4CA65?style=flat-square&logo=ejs&logoColor=black) | Server-side rendering |
| **Animation** | ![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=flat-square&logo=greensock&logoColor=white) | Scroll-triggered animations |
| **Security** | ![Helmet](https://img.shields.io/badge/Helmet-purple?style=flat-square) | HTTP security headers |
| **Container** | ![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white) | Containerized deployment |
| **Typography** | ![Google Fonts](https://img.shields.io/badge/Montserrat-4285F4?style=flat-square&logo=google&logoColor=white) | Font family |
| **Icons** | ![Remix](https://img.shields.io/badge/Remix_Icons-2F3337?style=flat-square) | UI iconography |

</div>

---

## 🔒 Security Features

- **Helmet** — Sets secure HTTP headers automatically
- **Rate Limiting** — API routes limited to 100 req/15min per IP
- **Parameterized Queries** — All SQL uses bound parameters (no injection)
- **Input Validation** — Server-side validation on all form endpoints
- **CORS-safe** — No cross-origin API exposure by default
- **Compression** — Gzip response compression for performance

---

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**.

---

<div align="center">

### ⭐ Star this repo if you found it useful!

<img src="https://images.unsplash.com/photo-1592919505780-303950717480?w=800&h=250&fit=crop&crop=center" alt="Golf Sunset" width="80%" />

**Built with ❤️ by [Aleem Rana](https://github.com/aleemrana8)**

*Full-stack Node.js + Express + SQLite + GSAP — From static page to production platform*

</div>
