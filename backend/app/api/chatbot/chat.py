from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, Field
from app.services.ollama_service import ask_ollama

router = APIRouter(prefix="/chatbot", tags=["Chatbot"])

class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, description="The message from the user")
    language: str = Field("en", description="Response language preference ('en' or 'hi')")

class ChatResponse(BaseModel):
    response: str
    status: str = "success"

@router.post("")
@router.post("/")
async def chat_endpoint(request: ChatRequest):
    """
    FastAPI POST endpoint for the RescueAI Chatbot.
    Accepts user message and language, queries local Ollama service,
    and returns the response.
    """
    if not request.message.strip():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Message cannot be empty."
        )

    try:
        ai_response = ask_ollama(
            user_message=request.message,
            language=request.language
        )
        
        # Check if the service returned an error message
        if ai_response.startswith("Error communicating with Ollama:"):
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail=ai_response
            )
            
        return ChatResponse(response=ai_response, status="success")
        
    except HTTPException as he:
        raise he
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An unexpected error occurred: {str(e)}"
        )