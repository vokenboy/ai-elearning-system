from fastapi import APIRouter, HTTPException, Depends
from .schemas import EvaluateRequest, EvaluateResponse

import os
import json
import re
from dotenv import load_dotenv
from google import genai
from google.genai.types import GenerateContentConfig, HttpOptions

load_dotenv()

router = APIRouter(
    prefix="/evaluate_exam_answers",
)

@router.post("/")
def evaluate_exam_answers(evaluate_request: EvaluateRequest):
    
    prompt = """
        Questions: {evaluate_request.questions}
        Student Answers: {evaluate_request.user_answers}
    """

    client = genai.Client(
        api_key=os.getenv("GOOGLE_API_KEY")
    )

    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=prompt.format(evaluate_request=evaluate_request),
        config=GenerateContentConfig(
            system_instruction=[
                "You are an experienced Software Engineer reviewing code submissions.",
                "You have a list programming questions and a list of user-submitted answers.",
                "Your role is to assess the user's answers by comparing it with the expected answer and evaluate based on questions scores.",
                "There are few question types: single select, multiple select and open question.",
                "Evaluate answers based on how close to the real question answer/answers it is and give a score based on questions scores.",            
                "Evaluate the user's answers focusing on the following criteria:",
                "Feedback: Provide constructive feedback highlighting strengths and areas for improvement. Mention specific parts of the answer that are incorrect and give throughout explanation why they were incorrect. And mention parts that were correct and throughout explanation why they were correct.",
                "Scoring: Assign a numerical score from 1 to given questions scores based on the overall quality of the answer. Deduct points for deviations from actual answers.",
                "Output your evaluation in JSON format with the following structure:",
                "  {",
                "    'scores': 'list of decimal',",
                "    'final_score': 'decimal'",
                "    'feedback': 'list of string',",
                "  }",
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