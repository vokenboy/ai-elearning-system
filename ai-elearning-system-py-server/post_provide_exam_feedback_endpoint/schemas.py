from pydantic import BaseModel
from typing import List

class FeedbackRequest(BaseModel):
    questions: List[dict]
    user_answers: List[dict]

class FeedbackResponse(BaseModel):
    evaluation: List[dict]
    improvements: str
