# ⚖️ AI Legal Document Analyzer

An AI-powered legal document analysis platform that enables users to upload legal PDF documents and interact with them using natural language queries. The application extracts text from uploaded PDFs and leverages a Large Language Model (LLM) to provide contextual legal insights, summaries, clause explanations, and question-answering capabilities.

---

## 🚀 Live Demo

Frontend:
https://your-vercel-url.vercel.app

Backend:
https://your-render-url.onrender.com

---

## 📌 Features

### 📄 PDF Upload & Processing
- Upload legal PDF documents.
- Extracts text from documents using PyMuPDF.
- Supports large legal contracts, agreements, and policy documents.

### 🤖 AI-Powered Legal Analysis
- Conversational question-answering over uploaded documents.
- Clause explanation and legal insight generation.
- Context-aware responses based only on uploaded PDF content.

### ⚡ Real-Time Interaction
- Instant AI responses.
- Fast API communication between frontend and backend.
- User-friendly chat-style interface.

### 🌐 Cloud Deployment
- Frontend deployed on Vercel.
- Backend deployed on Render.
- Accessible from any device via browser.

---

# 🏗️ System Architecture

User
↓
Next.js Frontend
↓
Axios API Requests
↓
FastAPI Backend
↓
PyMuPDF PDF Processing
↓
Groq API
↓
Llama 3.3 70B Model
↓
AI Generated Response

---

# 🛠️ Tech Stack

## Frontend
- Next.js
- React.js
- TypeScript
- Axios
- HTML5
- CSS3

## Backend
- Python
- FastAPI
- Uvicorn
- Python Dotenv

## AI & Generative AI
- Groq API
- Llama 3.3 70B Versatile
- Prompt Engineering

## Document Processing
- PyMuPDF (fitz)

## Deployment
- Vercel
- Render

---

# 📂 Project Structure

```bash
AI-Legal-Document-Analyzer/
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   ├── .env
│   └── uploads/
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/AI-Legal-Document-Analyzer.git

cd AI-Legal-Document-Analyzer
```

---

# Backend Setup

## Create Virtual Environment

```bash
python -m venv venv
```

## Activate Environment

### Windows

```bash
venv\Scripts\activate
```

### Linux/Mac

```bash
source venv/bin/activate
```

---

## Install Dependencies

```bash
pip install -r requirements.txt
```

---

## Create .env File

```env
GROQ_API_KEY=your_api_key_here
```

---

## Run Backend

```bash
uvicorn main:app --reload
```

Backend runs on:

```bash
http://localhost:8000
```

---

# Frontend Setup

## Install Dependencies

```bash
npm install
```

---

## Start Frontend

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:3000
```

---

# API Endpoints

## Upload PDF

### Endpoint

```http
POST /upload
```

### Request

```form-data
file : PDF
```

### Response

```json
{
  "message": "PDF uploaded successfully",
  "filename": "contract.pdf",
  "chars": 15890
}
```

---

## Ask Question

### Endpoint

```http
POST /query
```

### Request

```json
{
  "question": "What is the termination clause?"
}
```

### Response

```json
{
  "answer": "The agreement may be terminated by..."
}
```

---

# 🧠 Prompt Engineering

The application uses structured system prompts to restrict AI responses only to information present inside the uploaded PDF.

Example:

```python
You are a legal AI assistant.

Answer ONLY from the PDF content below.
```

Benefits:

- Reduces hallucinations.
- Improves legal relevance.
- Maintains document grounding.
- Enhances response accuracy.

---

# 🔐 Security Considerations

Current Version:
- CORS Protection
- Environment Variables
- API Key Isolation

Future Improvements:
- JWT Authentication
- User Login System
- Database Storage
- PDF Encryption
- Role-Based Access Control

---

# 🚧 Future Enhancements

- User Authentication
- Chat History
- Multiple PDF Support
- Vector Database Integration
- RAG Pipeline
- Legal Risk Scoring
- Clause Highlighting
- PDF Annotation
- Multi-language Support

---

# 📚 Concepts Used

## Frontend
- React Components
- State Management
- API Integration
- Responsive Design

## Backend
- REST APIs
- Async Programming
- File Upload Handling
- Middleware

## AI
- Generative AI
- Large Language Models
- Prompt Engineering
- Context Injection

## Deployment
- Vercel Hosting
- Render Hosting
- Environment Management

---

# 👩‍💻 Author

Harshita Singh

GitHub:
https://github.com/HarshitaSingh2005

LinkedIn:
https://www.linkedin.com/in/harshita-singh-1b84052aa

---

# ⭐ If you found this project useful, consider giving it a star!
