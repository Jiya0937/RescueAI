import os
import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from dotenv import load_dotenv

# Import chatbot router
from app.api.chatbot.chat import router as chatbot_router
# Import OCR router 
from app.api.ocr.ocr import router as ocr_router
# Import Omputer Vision
from app.api.vision.detection import router as vision_router
# Import speech 
from app.api.speech.speech import router as speech_router
# Import Test to test 
from app.api.tts.tts import router as tts_router
# Import Maps
from app.api.maps.maps import router as maps_router

# Load environment variables
load_dotenv()

# Setup logging configuration
logging.basicConfig(
    level=os.getenv("LOG_LEVEL", "INFO").upper(),
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    handlers=[
        logging.StreamHandler()
    ]
)
logger = logging.getLogger("rescue-ai-backend")

# Define lifespan event handler for startup/shutdown actions
@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Initializing RescueAI Backend services...")
    # Add any model warmups or DB connection pool setups here in the future
    yield
    logger.info("Shutting down RescueAI Backend services...")

# Initialize FastAPI application
app = FastAPI(
    title="RescueAI API",
    description="Offline Emergency Assistant API backend for critical offline support tools.",
    version="1.0.0",
    lifespan=lifespan,
    docs_url="/docs" if os.getenv("DEBUG", "True").lower() in ("true", "1", "yes") else None,
    redoc_url="/redoc" if os.getenv("DEBUG", "True").lower() in ("true", "1", "yes") else None,
)

# CORS configurations for frontend communication
# Allow localhost:5173 (React Vite), 127.0.0.1:5173, and optionally configured production origins
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",  # Frontend running inside docker
    "http://127.0.0.1:3000",  # Vite dev server opened via 127.0.0.1 instead of localhost
]

# Allow additional origins from environment variables if present
extra_origins = os.getenv("ALLOWED_ORIGINS")
if extra_origins:
    origins.extend([o.strip() for o in extra_origins.split(",")])

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global Exception Handlers for production resilience
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled error occurred: {str(exc)}", exc_info=True)
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={"detail": "An internal server error occurred. Please try again later."},
    )

# Register routers
                # Endpoint: /chatbot
app.include_router(chatbot_router, prefix="/api")   # Endpoint: /api/chatbot
app.include_router(ocr_router, prefix="/api")
app.include_router(vision_router, prefix="/api")
app.include_router(speech_router, prefix="/api")
app.include_router(tts_router, prefix="/api")
app.include_router(maps_router, prefix="/api")


# Root Endpoint / Health Check
@app.get("/", tags=["Health Check"])
async def root_health_check():
    """
    Root endpoint serving as a production-ready health check.
    Returns status, version, and active offline modes of the RescueAI system.
    """
    return {
        "status": "healthy",
        "app": "RescueAI Backend",
        "version": "1.0.0",
        "offline_mode": os.getenv("OFFLINE_MODE", "True").lower() in ("true", "1", "yes"),
        "modules": {
            "voice_assistant": os.getenv("ENABLE_VOICE_ASSISTANT", "True").lower() in ("true", "1", "yes"),
            "ocr": os.getenv("ENABLE_OCR", "True").lower() in ("true", "1", "yes"),
            "object_detection": os.getenv("ENABLE_OBJECT_DETECTION", "True").lower() in ("true", "1", "yes"),
            "tts": os.getenv("ENABLE_TTS", "True").lower() in ("true", "1", "yes"),
            "chatbot": os.getenv("ENABLE_CHATBOT", "True").lower() in ("true", "1", "yes"),
        }
    }

if __name__ == "__main__":
    import uvicorn
    host = os.getenv("HOST", "127.0.0.1")
    port = int(os.getenv("PORT", 8000))
    debug = os.getenv("DEBUG", "True").lower() in ("true", "1", "yes")
    
    logger.info(f"Starting server on {host}:{port} with debug={debug}...")
    uvicorn.run(
        "app.main:app",
        host=host,
        port=port,
        reload=debug
    )
