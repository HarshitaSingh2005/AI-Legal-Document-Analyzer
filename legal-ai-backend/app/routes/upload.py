from fastapi import APIRouter, UploadFile, File
from datetime import datetime
from zoneinfo import ZoneInfo
from app.services.pdf_service import extract_text_from_pdf
from app.services.chunk_service import chunk_text
from app.services.embedding_service import generate_embeddings
from app.services.store_service import store_chunks

router = APIRouter()

@router.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):

    # Extract text
    text = extract_text_from_pdf(file.file)

    # Chunk text
    chunks = chunk_text(text)

    # Generate embeddings
    embeddings = generate_embeddings(chunks)

    # Store embeddings
    success = store_chunks(chunks, embeddings)

    if not success:
        return {
            "error": "Failed to store embeddings"
        }

    return {
        "filename": file.filename,
        "chunks_stored": len(chunks),
        "embedding_dimension": len(embeddings[0])
    }