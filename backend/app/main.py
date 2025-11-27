from fastapi import FastAPI,Depends
from sqlalchemy.orm import session
from APP.models import User
import APP.auth
from fastapi.middleware.cors import CORSMiddleware
from APP.database import get_db, Base ,engine, SessionLocal

Base.metadata.create_all(bind = engine)

app = FastAPI()
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],   
)
@app.get("/hey")
def get_db(db: session = Depends(get_db)):
    return db.query(User).all()

app.include_router(APP.auth.router)  




