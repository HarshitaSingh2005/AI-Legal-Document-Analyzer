from fastapi import APIRouter
from pydantic import BaseModel

from app.services.search_service import search_similar_chunks
from app.services.llm_service import generate_answer

router = APIRouter()

class QueryRequest(BaseModel):
    question: str

@router.post("/query")
async def query_documents(data: QueryRequest):

    results = search_similar_chunks(data.question)

    context = "\n".join(results)

    answer = generate_answer(
        data.question,
        context
    )

    return {
        "question": data.question,
        "answer": answer,
        "sources": results
    }