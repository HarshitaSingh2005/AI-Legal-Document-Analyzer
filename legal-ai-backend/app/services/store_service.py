from app.database import SessionLocal
from app.models.document_chunk import DocumentChunk

def store_chunks(chunks, embeddings):

    db = SessionLocal()

    try:

        for chunk, embedding in zip(chunks, embeddings):

            db_chunk = DocumentChunk(
                chunk_text=chunk,
                embedding=embedding
            )

            db.add(db_chunk)

            # Commit one-by-one
            db.commit()

        return True

    except Exception as e:

        db.rollback()

        print("DATABASE ERROR:", e)

        return False

    finally:

        db.close()