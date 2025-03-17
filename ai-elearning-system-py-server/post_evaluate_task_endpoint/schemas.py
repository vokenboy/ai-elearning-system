from pydantic import BaseModel

class EvaluateRequest(BaseModel):
    task: str
    solution: str
    user_solution: str

class EvaluateResponse(BaseModel):
    evaluation: int
    feedback: str