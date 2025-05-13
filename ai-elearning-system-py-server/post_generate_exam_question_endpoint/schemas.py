from pydantic import BaseModel
from typing import List

# TaskRequest model to accept the task input
class TaskRequest(BaseModel):
    topics: List[dict]
    level: str
    questions_schema: List[dict]

# TaskResponse model to return a list of questions
class TaskResponse(BaseModel):
    questions: List[dict]