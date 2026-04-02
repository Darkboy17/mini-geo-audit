from fastapi import APIRouter, HTTPException
from app.models.request import AuditRequest
from app.models.response import AuditResponse
from app.services.fetcher import fetch_html
from app.services.extractor import extract_page_data
from app.services.classifier import classify_page_type
from app.services.schema_generator import generate_schema
from app.services.llm_enhancer import enhance_schema_with_llm
from app.utils.helpers import build_geo_summary
from app.core.config import USE_LLM_SCHEMA

# Initialize router
router = APIRouter()


# An API endpoint for running a page audit
@router.post("/audit", response_model=AuditResponse)
async def audit_page(payload: AuditRequest):

    try:
        # Fetch HTML
        html = await fetch_html(str(payload.url))
        
        # Extract page data
        extracted = extract_page_data(html, str(payload.url))

        # Classify page type
        page_type = classify_page_type(
            str(payload.url),
            extracted.get("title"),
            extracted.get("meta_description"),
            extracted.get("headings", [])
        )

        # Generate rule-based schema
        schema = generate_schema(str(payload.url), page_type, extracted)

        # Initialize LLM variable for debugging errors
        llm_error = None

        # Request override > env fallback
        should_use_llm = payload.use_llm if payload.use_llm is not None else USE_LLM_SCHEMA

        # Enhance schema with LLM
        if should_use_llm:
            try:
                llm_schema = enhance_schema_with_llm(
                    str(payload.url),
                    extracted,
                    page_type
                )

                if (
                    isinstance(llm_schema, dict)
                    and "schema_type" in llm_schema
                    and "rationale" in llm_schema
                    and "json_ld" in llm_schema
                ):
                    schema = llm_schema
                else:
                    llm_error = "LLM response missing required fields."

            except Exception as e:
                llm_error = str(e)
                print(f"\n[LLM ERROR] {llm_error}\n")

        # Build geo summary
        geo_summary = build_geo_summary(extracted, schema["schema_type"])

        return {
            "url": str(payload.url),
            "extracted_data": extracted,
            "page_type": page_type,
            "geo_summary": geo_summary,
            "schema_recommendation": schema,
            "llm_debug": {
                "llm_enabled": should_use_llm,
                "llm_used": schema.get("source") == "llm",
                "llm_error": llm_error
            }
        }

    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to audit page: {str(e)}")