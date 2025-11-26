from fastapi import FastAPI,Depends
from sqlalchemy.orm import session
from models import User
import schemas
import auth
from database import get_db, Base ,engine, SessionLocal

Base.metadata.create_all(bind = engine)

app = FastAPI()

@app.get("/hey")
def get_db(db: session = Depends(get_db)):
    return db.query(User).all()

app.include_router(auth.router)  




