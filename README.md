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
- 📤 **File Uploads** – Supports plain text  
- 📧 **Email Service** – Get summarized notes directly via email  
- 🛡 **Protected Routes** – Role-based access with authentication guard  
- 🎨 **Modern UI** – Built with **Tailwind CSS + ShadCN UI components**  

---
# AI Meeting Summarizer

## 📌 Overview
AI Meeting Summarizer is a web application that leverages AI to automatically summarize meeting transcripts into clear, structured summaries with key action items.  
It helps teams save time by providing concise meeting insights.

---

## 🚀 Features
- Upload transcripts in ** plain text** format.
- Generate AI-powered **structured summaries**.
- Extract **key action items & decisions**.
- Simple and user-friendly dashboard.
- Built with **React + Vite + Node.js**.

---

## 🏗 Project Structure
```
AI-Meeting-Summarizer/
│── backend/                # Node.js + Express server
│   ├── index.js            # Entry point
│   ├── routes/             # API routes
│   ├── controllers/        # Request handling logic
│   ├── services/           # AI + file processing logic
│   └── uploads/            # Uploaded files storage
│
│── frontend/               # React + Vite frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # App pages (Dashboard, Upload, Preview)
│   │   ├── hooks/          # Custom React hooks
│   │   ├── utils/          # Helper functions
│   │   ├── App.tsx         # Root component
│   │   └── main.tsx        # Entry file
│   └── public/             # Static assets
│
│── README.md               # Project documentation
│── package.json            # Dependencies & scripts
│── vite.config.js          # Vite configuration
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/AI-Meeting-Summarizer.git
cd AI-Meeting-Summarizer
```

### 2️⃣ Setup Backend
```bash
cd backend
npm install
npm run dev
```

### 3️⃣ Setup Frontend
```bash
cd frontend
npm install
npm run dev
```

### 4️⃣ Environment Variables
Create a `.env` file in **backend/** with:
```env
PORT=5000
OPENAI_API_KEY=your_openai_api_key
```

---

## 📖 Usage
1. Open the frontend app in browser (`http://localhost:5173`).
2. Upload a transcript (`.pdf`, `.txt`, or raw text).
3. Enter optional instructions for AI summarization.
4. Get structured summary with action items.

---

## 🤝 Contributing
1. Fork the project.
2. Create a feature branch (`git checkout -b feature-name`).
3. Commit changes (`git commit -m "Added new feature"`).
4. Push to your branch (`git push origin feature-name`).
5. Open a Pull Request.

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

---

## 👨‍💻 Author
Developed by **Anantha Atole** 🚀  



