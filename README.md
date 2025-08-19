# 📝 Smart AI Note Taker  

![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js)  
![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)  
![MongoDB](https://img.shields.io/badge/MongoDB-6.x-47A248?logo=mongodb)  
![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)  
![Render](https://img.shields.io/badge/Deployed%20on-Render-purple?logo=render)  

An **AI-powered note-taking platform** that helps you capture, summarize, and organize meeting notes.  
Upload transcripts, text, or files, and let AI generate **concise summaries** with **action items**.  

---

## ✨ Features  

- 🔐 **Secure Authentication** – JWT-based user login & registration  
- 📂 **Notes Management** – Create, view, and organize notes  
- 🤖 **AI Summarization** – Summarizes uploaded transcripts or typed text  
- 📤 **File Uploads** – Supports `.pdf`, `.txt`, or plain text  
- 📧 **Email Service** – Get summarized notes directly via email  
- 🛡 **Protected Routes** – Role-based access with authentication guard  
- 🎨 **Modern UI** – Built with **Tailwind CSS + ShadCN UI components**  

---

## 📂 Project Structure  

-├── backend/ # Express + MongoDB + AI backend
-│ ├── controller/ # Controllers (user, notes)
-│ ├── middleware/ # Auth & upload middleware
-│ ├── model/ # Mongoose models
-│ ├── routes/ # Express routes
-│ ├── services/ # AI & email services
-│ ├── uploads/ # Uploaded files
-│ └── server.js # Backend entry
-│
-├── smart-ai-note-taker/ # React + Vite + TS frontend
-│ ├── src/
-│ │ ├── components/ # Reusable UI & feature components
-│ │ ├── contexts/ # Auth context
-│ │ ├── hooks/ # Custom hooks
-│ │ ├── lib/ # API utilities
-│ │ ├── pages/ # Pages (Dashboard, Notes, Profile, etc.)
-│ │ └── App.tsx # Root App
-│ └── vite.config.ts # Vite configuration
-│
-├── render.yaml # Render deployment config
-└── README.md # Documentation


---

## 🛠 Tech Stack  

**Frontend**  
- ⚡ React + Vite + TypeScript  
- 🎨 Tailwind CSS + ShadCN UI  
- 🔄 Context API  

**Backend**  
- 🟢 Node.js + Express  
- 🗄 MongoDB (Mongoose)  
- 🔑 JWT Authentication  
- 🤖 AI Service Integration  
- 📧 Nodemailer  

**Deployment**  
- 🚀 Render (backend + frontend hosting)  

---

## ⚙️ Setup & Installation  

### 🔹 Clone Repo  
```bash
git clone https://github.com/your-username/smart-ai-note-taker.git
cd smart-ai-note-taker

