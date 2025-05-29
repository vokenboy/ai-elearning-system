from fastapi import APIRouter, HTTPException, Depends
from .schemas import FeedbackRequest, FeedbackResponse

import os
import json
import re
from dotenv import load_dotenv
from google import genai
from google.genai.types import GenerateContentConfig, HttpOptions

load_dotenv()

router = APIRouter(
    prefix="/provide_exam_feedback",
)

@router.post("/")
def provide_exam_feedback(feedback_request: FeedbackRequest):
    
    prompt = """
        Questions: {feedback_request.questions}
        Student Answers: {feedback_request.user_answers}
    """

    client = genai.Client(
        api_key=os.getenv("GOOGLE_API_KEY")
    )

    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=prompt.format(feedback_request=feedback_request),
        config=GenerateContentConfig(
            system_instruction=[
                "You are an experienced Software Engineer reviewing code submissions.",
                "You have a list programming questions and a list of user-submitted answers.",
                "Your role is to assess the user's answers by comparing it with the expected answer and generate a feedback based on mistakes in answers.",
                "There are few question types: single select, multiple select and open question.",
                "Evaluate the user's answers focusing giving a decent feedback where to improve and how",
                "Feedback: Provide constructive feedback for each question highlighting strengths and areas for improvement. Mention specific parts of the answer that are incorrect and give throughout explanation why they were incorrect. And mention parts that were correct and throughout explanation why they were correct.",
                "Improvement: Provide constructive but motivational feedback of all answers and what needs to be improved, so that the user would do better next time, address the student as 'you'.",
                "Id, Question and topic is the same as given in request",
                "Output your evaluation of every given question in JSON format with the following structure:",
                "  {",
                "    'evaluation': ["
                "       'id: 'number of question',"
                "       'question': 'string',"
                "       'topic': 'string',"
                "       'feedback': 'string',"
                "    ]",
                "   'improvements: 'string'",
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