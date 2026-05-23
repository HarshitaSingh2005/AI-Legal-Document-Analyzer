from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import fitz  # PyMuPDF
import requests
from dotenv import load_dotenv

# ✅ CORRECT
load_dotenv()

app = FastAPI()  # ← ADD THIS LINE

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/")
async def root():
    return {"status": "ok"}

# store pdf text globally (simple version)
pdf_text = ""

# -------------------------
# UPLOAD PDF
# -------------------------
@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    global pdf_text

    content = await file.read()

    doc = fitz.open(stream=content, filetype="pdf")

    pdf_text = ""
    for page in doc:
        pdf_text += page.get_text()

    return {
        "message": "PDF uploaded successfully",
        "filename": file.filename,
        "chars": len(pdf_text)
    }


# -------------------------
# ASK QUESTION (OLLAMA AI)
# -------------------------
from groq import Groq
import os

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

@app.post("/query")
async def ask_question(payload: dict):
    global pdf_text

    question = payload.get("question")

    if not pdf_text:
        return {"answer": "No PDF uploaded."}

    try:
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": f"""
You are a legal AI assistant.

Answer ONLY from the PDF content below.

PDF CONTENT:
{pdf_text}
"""
                },
                {
                    "role": "user",
                    "content": question
                }
            ],
            model="llama-3.3-70b-versatile",
        )

        answer = chat_completion.choices[0].message.content

        return {
            "answer": answer
        }

    except Exception as e:
        return {
            "answer": str(e)
        }
    