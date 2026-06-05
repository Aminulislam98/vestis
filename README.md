<div align="center">

# VESTIS

### Premium Fashion E-Commerce Platform

[![Next.js](https://img.shields.io/badge/Next.js_15-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

**[🌐 Live Site](https://vestis-psi.vercel.app)** &nbsp;·&nbsp; **[📂 Client Repo](https://github.com/Aminulislam98/vestis-client)** &nbsp;·&nbsp; **[⚙️ Server Repo](https://github.com/Aminulislam98/vestis-server)**

</div>

## ✨ Features

- 🛍️ **Full Cart & Checkout Flow** — add, remove, update quantity, place orders
- ❤️ **Wishlist System** — with optimistic UI toggling (instant feel, server confirms later)
- 🔐 **Authentication** — email/password + Google OAuth via Better Auth + JWT
- 🛒 **Guest → User Cart Merge** — localStorage cart merges into MongoDB on login, seamlessly
- 🔍 **Search with Debounce** — fast, non-blocking product search
- 📦 **Order History & Tracking** — full order lifecycle on user profile
- 🖼️ **Product Image Gallery** — multi-image swiper per product with hover second-image effect
- 🎨 **Smooth Animations** — Framer Motion page transitions + Lenis smooth scroll
- 🌐 **Full SEO** — dynamic metadata per product with OG image generation
- 📱 **Fully Responsive** — mobile-first, pixel-perfect across all screen sizes

---

## 🛠️ Tech Stack

### Frontend

| Technology              | Purpose                      |
| ----------------------- | ---------------------------- |
| Next.js 15 (App Router) | Framework & SSR/SSG          |
| Tailwind CSS v4         | Styling                      |
| Framer Motion           | Animations & transitions     |
| Lenis                   | Smooth scrolling             |
| Zustand                 | Global cart & wishlist state |
| Swiper.js               | Product image galleries      |
| HeroUI / Shadcn/ui      | UI component primitives      |

### Backend

| Technology    | Purpose                               |
| ------------- | ------------------------------------- |
| Express.js    | REST API                              |
| MongoDB Atlas | Database                              |
| Better Auth   | Authentication (email + Google OAuth) |
| JWT           | Session management                    |

### Deployment

| Service         | Purpose             |
| --------------- | ------------------- |
| Vercel          | Frontend deployment |
| Vercel / Render | Backend deployment  |
| MongoDB Atlas   | Cloud database      |

---

## 🧠 Hard Problems Solved

### 1. Guest → User Cart & Wishlist Merge

When a guest user logs in, their localStorage cart and wishlist merge seamlessly into their MongoDB account. This required careful thought around data architecture — handling conflicts, deduplication, and state synchronisation across client and server.

### 2. Global Cart State with Zustand

The navbar cart badge stays in sync across the entire application without prop drilling. Zustand's minimal API made this surprisingly clean to implement.

### 3. Optimistic UI on Wishlist

The heart icon toggles instantly before the server responds. If the server fails, it reverts. A small detail — but it transforms the feel of the app from sluggish to snappy.

### 4. Better Auth + JWT in Production

Debugging token issuer mismatches between local and production environments taught more about authentication than any course. The fix involved aligning `BETTER_AUTH_URL`, `CLIENT_URL`, and `JWT_ISSUER` environment variables precisely across both environments.

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB Atlas account
- Google OAuth credentials (for Google login)

### 1. Clone the repositories

```bash
# Frontend
git clone https://github.com/Aminulislam98/vestis-client.git
cd vestis-client

# Backend (separate terminal)
git clone https://github.com/Aminulislam98/vestis-server.git
cd vestis-server
```

### 2. Install dependencies

```bash
# In both /vestis-client and /vestis-server
npm install
```

### 3. Set up environment variables

**Backend `.env`:**

```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_uri
BETTER_AUTH_SECRET=your_secret
BETTER_AUTH_URL=http://localhost:5000
CLIENT_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

**Frontend `.env.local`:**

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Run locally

```bash
# Backend
npm run dev

# Frontend (separate terminal)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
vestis-client/
├── app/                    # Next.js App Router pages
│   ├── (auth)/             # Login, Register
│   ├── products/           # Product listing & detail
│   ├── cart/               # Cart page
│   ├── checkout/           # Checkout flow
│   └── profile/            # User profile & order history
├── components/             # Reusable UI components
├── store/                  # Zustand global state
├── lib/                    # Utilities & API helpers
└── public/                 # Static assets

vestis-server/
├── routes/                 # Express route handlers
├── models/                 # Mongoose schemas
├── middleware/             # Auth, error handling
└── lib/                    # Auth config (Better Auth)
```

---

## 👤 Author

**Aminul Islam** — Full-Stack Developer

[![Portfolio](https://img.shields.io/badge/Portfolio-aminulislam.uk-black?style=flat-square)](https://aminulislam.uk)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-aminulislam98-0077B5?style=flat-square&logo=linkedin)](https://linkedin.com/in/aminulislam98)
[![GitHub](https://img.shields.io/badge/GitHub-Aminulislam98-181717?style=flat-square&logo=github)](https://github.com/Aminulislam98)

---

<div align="center">
  <sub>Built with care in London 🇬🇧</sub>
</div>
