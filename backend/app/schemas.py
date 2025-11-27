from pydantic import BaseModel

class UserCreat(BaseModel):
    username: str
    email: str
    full_name: str
    password: str
class Usercheck(BaseModel):
    username : str
    password : str
class UserRead(BaseModel):
    id : int
    username : str
    
    class config:
        orm_mode = True