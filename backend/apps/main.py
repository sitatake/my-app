from fastapi import FastAPI, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware

from . import models, schemas
from .database import SessionLocal, engine


models.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
async def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
async def read_item(item_id: int, q: str | None = None):
    return {"item_id": item_id, "q": q}


@app.get("/todo/", response_model=list[schemas.Todo])
def get_todo(db: Session = Depends(get_db)):
    return db.query(models.Todo).order_by(models.Todo.id.desc()).all()


@app.post("/todo/", response_model=schemas.Todo)
def create_todo(todo: schemas.TodoCreate, db: Session = Depends(get_db)):
    db_todo = models.Todo(**todo.model_dump())
    db.add(db_todo)
    db.commit()
    db.refresh(db_todo)
    return db_todo


@app.put("/todo/{todo_id}", response_model=schemas.Todo)
def done_todo(todo: schemas.TodoCreate, todo_id: int, db: Session = Depends(get_db)):
    db_todo = (
        db.execute(select(models.Todo).where(models.Todo.id == todo_id))
        .scalars()
        .first()
    )
    db_todo.done = todo.done
    db_todo.text = todo.text
    db.commit()
    return db_todo

