from pydantic import BaseModel

class TaskRequest(BaseModel):
    topic: str
    language: str
    description: str
    keywords: list[str]
    level: str

class TaskResponse(BaseModel):
    task: str
    solution: str