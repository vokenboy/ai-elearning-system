from pydantic import BaseModel
from typing import List

class EvaluateRequest(BaseModel):
    questions: List[dict]
    user_answers: dict

class EvaluateResponse(BaseModel):
    scores: List[int]
    final_score: int
    feedback: List[str]