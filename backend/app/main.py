from fastapi import FastAPI
from app.api.routes.audit import router as audit_router


'''This is the main entry point for the FastAPI application. It initializes the app, sets up the routes, and defines a root endpoint. The app is configured with a title, description, and version for better documentation. The root endpoint provides a welcome message and directs users to the API documentation. The audit routes are included under the /api/v1 prefix, allowing for organized and versioned API endpoints.
'''

app = FastAPI(
    title="Villion GEO Audit API",
    description="Mini GEO audit prototype for structured data recommendations.",
    version="1.0.0"
)

@app.get("/")
async def root():
    return {
        "message": "Welcome to the Mini GEO Audit API! Visit /docs to test the API."
    }

app.include_router(audit_router, prefix="/api/v1", tags=["Audit"])