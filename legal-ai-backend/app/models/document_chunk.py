from sqlalchemy import Column, Integer, Text
from pgvector.sqlalchemy import Vector

from app.database import Base

class DocumentChunk(Base):

    __tablename__ = "document_chunks"

    id = Column(Integer, primary_key=True, index=True)

    chunk_text = Column(Text)

    embedding = Column(Vector(384))