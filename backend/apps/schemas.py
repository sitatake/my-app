from pydantic import BaseModel


class Todo(BaseModel):
    id: int
    text: str
    done: bool


class TodoCreate(BaseModel):
    text: str
    done: bool
