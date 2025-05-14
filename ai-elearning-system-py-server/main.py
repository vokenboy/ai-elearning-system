from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from post_generate_task_endpoint import generate_task
from post_evaluate_task_endpoint import evaluate_task
from post_generate_exam_questions_endpoint import generate_exam_questions
from post_evaluate_exam_answers_endpoint import evaluate_exam_answers

app = FastAPI()
app.include_router(generate_task.router)
app.include_router(evaluate_task.router)
app.include_router(generate_exam_questions.router)
app.include_router(evaluate_exam_answers.router)

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
