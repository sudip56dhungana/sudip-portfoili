# 🚀 Dynamic Portfolio — React + Node.js + MongoDB

A fully dynamic, full-stack portfolio website with a beautiful dark UI, admin message inbox, and MongoDB backend.

---

## 📁 Project Structure

```
portfolio/
├── client/                   # React frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx / .css
│   │   │   ├── Hero.jsx / .css
│   │   │   ├── About.jsx / .css
│   │   │   ├── Portfolio.jsx / .css
│   │   │   ├── Experience.jsx / .css
│   │   │   ├── Contact.jsx / .css
│   │   │   └── Footer.jsx / .css
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   └── AdminMessages.jsx / .css
│   │   ├── api.js              # Axios API service layer
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css           # Global styles & CSS variables
│   └── package.json
│
└── server/                   # Node.js + Express backend
    ├── models/
    │   ├── Message.js          # Contact messages schema
    │   ├── Project.js          # Portfolio projects schema
    │   └── Profile.js          # Your profile/bio schema
    ├── routes/
    │   ├── messages.js         # GET/POST/DELETE/PATCH messages
    │   ├── projects.js         # CRUD for projects
    │   └── profile.js          # GET/PUT profile
    ├── server.js               # Express app entry point
    ├── .env.example
    └── package.json
```

---

## ⚡ Quick Start

### Prerequisites
- Node.js v18+
- MongoDB (local or [MongoDB Atlas](https://cloud.mongodb.com))
- npm or yarn

---

### 1. Clone & Install

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

---

### 2. Configure Environment

```bash
cd server
cp .env.example .env
```

Edit `.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
ADMIN_PASSWORD=your_secret_admin_key
CLIENT_URL=http://localhost:3000
```

> For **MongoDB Atlas**, replace `MONGODB_URI` with your Atlas connection string.

---

### 3. Run the App

**Terminal 1 — Backend:**
```bash
cd server
npm run dev     # uses nodemon for hot reload
# or
npm start
```

**Terminal 2 — Frontend:**
```bash
cd client
npm start
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🌐 Pages & Features

### Portfolio (`/`)
| Section | Description |
|---------|-------------|
| **Navbar** | Fixed, scroll-aware, smooth scroll to sections, mobile hamburger menu |
| **Hero** | Animated particle canvas, name, title, socials, stats |
| **About** | Bio, skills grid, education, contact details |
| **Portfolio** | Filterable project cards with live/GitHub links |
| **Experience** | Interactive tab panel with company timeline |
| **Contact** | Full contact form that saves to MongoDB |
| **Footer** | Minimal branded footer |

### Admin Messages (`/admin/messages`)
- Password-protected inbox
- View all contact form submissions
- Mark messages as read/unread
- Delete messages
- One-click **Reply via Email**
- Unread counter badge

---

## 🔌 API Endpoints

### Profile
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/profile` | Get portfolio profile (public) |
| PUT | `/api/profile` | Update profile (requires adminKey) |

### Projects
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/projects` | List all projects |
| POST | `/api/projects` | Add project (requires adminKey) |
| PUT | `/api/projects/:id` | Update project (requires adminKey) |
| DELETE | `/api/projects/:id` | Delete project (requires adminKey) |

### Messages
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/messages` | Send contact message (public) |
| GET | `/api/messages?adminKey=xxx` | Get all messages (admin) |
| PATCH | `/api/messages/:id/read` | Mark as read (admin) |
| DELETE | `/api/messages/:id` | Delete message (admin) |

---

## ✏️ Customizing Your Portfolio

### Update your profile
Send a PUT request to `/api/profile` with your `adminKey`:

```bash
curl -X PUT http://localhost:5000/api/profile \
  -H "Content-Type: application/json" \
  -d '{
    "adminKey": "your_secret_admin_key",
    "name": "Jane Doe",
    "title": "Full Stack Engineer",
    "bio": "I build things for the web...",
    "email": "jane@example.com",
    "location": "Kathmandu, Nepal",
    "skills": [
      { "category": "Frontend", "items": ["React", "TypeScript", "CSS"] },
      { "category": "Backend", "items": ["Node.js", "Express", "MongoDB"] }
    ],
    "experience": [
      {
        "company": "My Company",
        "role": "Lead Developer",
        "duration": "2023 - Present",
        "description": "Building awesome things.",
        "current": true
      }
    ],
    "socials": {
      "github": "https://github.com/janedoe",
      "linkedin": "https://linkedin.com/in/janedoe"
    }
  }'
```

### Add a project
```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "adminKey": "your_secret_admin_key",
    "title": "E-Commerce App",
    "description": "A full-stack shopping platform.",
    "techStack": ["React", "Node.js", "MongoDB", "Stripe"],
    "category": "web",
    "featured": true,
    "liveUrl": "https://myapp.com",
    "githubUrl": "https://github.com/you/myapp"
  }'
```

---

## 🚀 Deployment

### Backend (Railway / Render / Heroku)
1. Set environment variables (PORT, MONGODB_URI, ADMIN_PASSWORD, CLIENT_URL)
2. Deploy the `/server` folder
3. Use MongoDB Atlas for production database

### Frontend (Vercel / Netlify)
1. Set `REACT_APP_API_URL` to your deployed backend URL
2. Deploy the `/client` folder
3. Set build command: `npm run build`, publish dir: `build`

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| Primary bg | `#080b0f` |
| Card bg | `#111720` |
| Accent | `#e8c44a` (gold) |
| Font display | Playfair Display |
| Font body | DM Sans |
| Font mono | DM Mono |

---

## 📄 License
MIT — free to use and customize for your own portfolio.
