from sqlalchemy import Column, Integer, String
from APP.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String)
    full_name = Column(String)
    email = Column(String)
    password = Column(String)
