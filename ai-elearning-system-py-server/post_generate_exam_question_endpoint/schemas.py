from pydantic import BaseModel

class TaskRequest(BaseModel):
    topic: str
    language: str
    description: str
    tags: list[str]
    level: str

class TaskResponse(BaseModel):
    question: str
    question_type: str
    answers: str
    correct_answer: str