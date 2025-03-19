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
    prefix="/evaluate_task",
)

@router.post("/")
def evaluate_task(evaluate_request: EvaluateRequest):
    
    prompt = """
        Task: {evaluate_request.task}
        Expected Solution: {evaluate_request.solution}
        Students Solution: {evaluate_request.user_solution}
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
                "You have a programming task description, a reference solution, and a user-submitted solution.",
                "Your role is to assess the user's solution by comparing it with the reference solution to ensure it meets the requirements specified in the task description.",
                "Evaluate the user's solution focusing on the following criteria:",
                "Correctness: Ensure the solution correctly implements the functionality as described in the task. It should handle all specified cases, especially edge cases.",
                "Code Quality: Assess readability, maintainability, and efficiency. Consider the use of proper naming conventions, code simplicity, and the efficiency of the approach.",
                "Best Practices: Check for the usage of best practices in the specific programming language, such as proper recursion in this case, and avoiding unnecessary complexity.",
                "Feedback: Provide constructive feedback highlighting strengths and areas for improvement. Mention specific parts of the code that are well-implemented or need revision.",
                "Scoring: Assign a numerical score from 1 to 100 based on the overall quality of the submission. Deduct points for deviations from best practices, inefficiencies, and errors.",
                "If the score is not 100, provide clear, actionable suggestions on what the user can change or improve to achieve a higher score. These suggestions should target specific aspects of their submission that could be improved, such as adding missing edge case handling, refining the code for readability, or adhering more closely to the specified requirements like recursion.",
                "Output your evaluation in JSON format with the following structure:",
                "  {",
                "    'feedback': 'string',",
                "    'evaluation': 'integer'",
                "  }",
                "Ensure your feedback is personalized, encouraging, and offers specific guidance to help the user improve their coding skills."
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