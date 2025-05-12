from pydantic import BaseModel

class TaskRequest(BaseModel):
    topic: str
    language: str
    description: str
    level: str
    question_type: str

class TaskResponse(BaseModel):
    question: str
    options: str
    answer: str