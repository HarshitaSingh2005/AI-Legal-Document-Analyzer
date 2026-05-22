from sqlalchemy import text
from app.database import SessionLocal
from app.services.embedding_service import model

def search_similar_chunks(query, limit=5):

    db = SessionLocal()

    try:

        # Generate query embedding
        query_embedding = model.encode(query).tolist()

        # Convert list to pgvector string format
        embedding_str = "[" + ",".join(map(str, query_embedding)) + "]"

        sql = text("""
            SELECT chunk_text,
                   embedding <=> CAST(:query_embedding AS vector) AS distance
            FROM document_chunks
            ORDER BY distance
            LIMIT :limit
        """)

        results = db.execute(
            sql,
            {
                "query_embedding": embedding_str,
                "limit": limit
            }
        )

        return [row[0] for row in results]

    except Exception as e:

        print("SEARCH ERROR:", e)
        return []

    finally:

        db.close()