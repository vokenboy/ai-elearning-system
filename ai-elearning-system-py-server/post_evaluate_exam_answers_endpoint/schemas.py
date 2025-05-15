from pydantic import BaseModel
from typing import List

class EvaluateRequest(BaseModel):
    questions: List[dict]
    user_answers: dict

class EvaluateResponse(BaseModel):
    evaluation: List[dict]
    final_score: float
    improvements: str
    topic_correctness: List[dict]
