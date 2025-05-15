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
    prefix="/generate_exam_questions",
)

@router.post("/")
def generate_exam_questions(task_request: TaskRequest):
    
    prompt = """
        Topics: {task_request.topics}
        Level: {task_request.level}
        Question_Schema: {task_request.questions_schema}
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
            "You write short and easy to understand programing questions for your students about something from given topic with description.",
            "Make questions cover as much of topic as possible.",
            "Questions cannot repeat.",
            "Answers to the questions can be single select, open question, multiple select.",
            "Based on question type generate possible answers for the question.",
            "For single select generate one correct and other incorrect answers.",
            "For multiple select question generate few correct and few incorrect answers.",
            "For open question generate just the question with possible answer.",
            "You receive a list of data and you need to write a question for your students.",
            "Data contains: topics, level, questions schema.",
            "You make task diffuculty based on level.",
            "Question has to be generated randomly using questions schema and descriptions from topics.",
            "Take topics descriptions based on which topic you select from questions schema.",
            "Questions are generated for exam for the specific programming language.",
            "Make as many questions as there are in questions schema.",
            "Your response must be in JSON object containing the following",
            "* questions: list which contains: "
            "*      id : integer(number of index+1), "
            "*      question : string, "
            "*      topic: string, "
            "*      question_type: string, "
            "*      options: list of strings, "
            "*      score: number given in questions schema, "
            "*      answers: list of strings",
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


    