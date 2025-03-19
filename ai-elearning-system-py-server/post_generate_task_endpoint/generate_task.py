from fastapi import APIRouter, HTTPException, Depends
from .schemas import TaskRequest, TaskResponse

import os
import json
import re
from dotenv import load_dotenv
from google import genai
from google.genai.types import GenerateContentConfig, HttpOptions

load_dotenv()

router = APIRouter(
    prefix="/generate_task",
)

@router.post("/")
def generate_task(task_request: TaskRequest):
    
    prompt = """
        Topic: {task_request.topic}
        Language: {task_request.language}
        Description: {task_request.description}
        Tags: {task_request.tags}
        Level: {task_request.level}
    """

    client = genai.Client(
        api_key=os.getenv("GOOGLE_API_KEY")
    )

    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=prompt.format(task_request=task_request),
        config=GenerateContentConfig(
            system_instruction = [
            "You are Software Engineering teacher.",
            "You write short and easy to understand programing tasks for your students.",
            "You receive a list of data and you need to write a task for your students.",
            "Data contains: topic, language, description, tags, level.",
            "You make task diffuculty based on level.",
            "Your response must be in JSON object containing the following",
            "* task: string",
            "* solution: string",
            "You expect a short and right answer from your students."
        ]
        ),
    )

    try:
        candidate_text = response.candidates[0].content.parts[0].text
    except (AttributeError, IndexError) as e:
        raise HTTPException(status_code=500, detail="Unexpected response structure from Gemini.")
    
    json_str = candidate_text.strip()
    json_str = re.sub(r'^```json', '', json_str)
    json_str = re.sub(r'```$', '', json_str)
    json_str = json_str.strip()
    
    try:
        result_json = json.loads(json_str)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error parsing Gemini response JSON: {e}")
    
    return result_json


    