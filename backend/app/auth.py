from datetime import datetime, timedelta
import os
from APP.translate import query
from fastapi import Depends, HTTPException, APIRouter, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import jwt, JWTError
from sqlalchemy.orm import Session

from APP.database import get_db
from APP.models import User
import APP.schemas


SECRET_KEY = os.environ.get("SECRET_KEY", "CHANGE_ME_IN_PRODUCTION")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

bearer_scheme = HTTPBearer()

router = APIRouter(
    prefix="/ha",
    tags=["hi"],
)

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def decode_token(token: str):
    try:
        return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except JWTError:
        return None


def verify_token(cred: HTTPAuthorizationCredentials = Depends(bearer_scheme)):
    token = cred.credentials
    decoded = decode_token(token)
    if decoded is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
        )
    return decoded


@router.post("/register", response_model=APP.schemas.UserCreat)
def register(user: APP.schemas.UserCreat, db: Session = Depends(get_db)):
    new_user = User(
        username=user.username,
        full_name=user.full_name,
        email=user.email,
        password=user.password, 
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


@router.post("/login")
def login(form_data: APP.schemas.Usercheck, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == form_data.username).first()
    if not user or user.password != form_data.password:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password",
        )
    payload = {"username": user.username}
    access_token = create_access_token(payload)

    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/translate")
def translate(
    Text : str,
    service : str,
    user: dict = Depends(verify_token)
):
    translate_text = query(Text,service)
    return translate_text
