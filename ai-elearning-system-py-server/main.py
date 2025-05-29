from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from post_generate_task_endpoint import generate_task
from post_evaluate_task_endpoint import evaluate_task
from post_generate_exam_questions_endpoint import generate_exam_questions
from post_provide_exam_feedback_endpoint import provide_exam_feedback

app = FastAPI()
app.include_router(generate_task.router)
app.include_router(evaluate_task.router)
app.include_router(generate_exam_questions.router)
app.include_router(provide_exam_feedback.router)

origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
