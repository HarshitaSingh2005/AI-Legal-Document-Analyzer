from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import fitz  # PyMuPDF
import requests

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
@app.post("/query")
async def ask_question(payload: dict):
    global pdf_text

    question = payload.get("question")

    try:
        import requests

        response = requests.post(
            "http://localhost:11434/api/generate",
            json={
                "model": "mistral",
                "prompt": f"""
PDF CONTENT:
{pdf_text}

QUESTION:
{question}
""",
                "stream": False
            }
        )

        data = response.json()

        return {
            "answer": data["response"]
        }

    except Exception as e:
        return {
            "answer": str(e)
        }