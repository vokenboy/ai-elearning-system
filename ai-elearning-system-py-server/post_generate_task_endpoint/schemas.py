from pydantic import BaseModel

class TaskRequest(BaseModel):
    topic: str
    language: str
    description: str
    tags: list[str]
    level: str

class TaskResponse(BaseModel):
    task: str
    solution: str