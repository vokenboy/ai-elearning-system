from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

# from post_generate_task_endpoint import generate_task
# from post_evaluate_task_endpoint import evaluate_task

app = FastAPI()
# app.include_router(generate_task.router)
# app.include_router(evaluate_task.router)