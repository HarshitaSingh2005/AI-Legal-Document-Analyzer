from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

DATABASE_URL = "postgresql://postgres.uqkyxawyjcfivpaouyrz:H%40rsh%21480%24ta@aws-1-ap-northeast-1.pooler.supabase.com:5432/postgres"
engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()