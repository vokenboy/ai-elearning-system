from pydantic import BaseModel
from typing import List

class TaskRequest(BaseModel):
    topics: List[dict]
    level: str
    questions_schema: List[dict]

class TaskResponse(BaseModel):
    questions: List[dict]