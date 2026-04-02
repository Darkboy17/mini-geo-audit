import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configuration variables
GROQ_API_KEY = os.getenv("GROQ_API_KEY", "")
GROQ_MODEL = os.getenv("GROQ_MODEL", "llama-3.3-70b-versatile")
USE_LLM_SCHEMA = os.getenv("USE_LLM_SCHEMA", "false").lower() == "true"