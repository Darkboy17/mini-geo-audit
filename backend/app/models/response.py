from pydantic import BaseModel
from typing import List, Dict, Any, Optional


'''This module defines the data models for the API responses using Pydantic.
These models ensure that the API responses are structured and validated according to the defined schema.
'''

# The ExtractedPageData model represents the structured data extracted from a web page, including the title, meta description, headings, and image URL.
class ExtractedPageData(BaseModel):
    title: Optional[str]
    meta_description: Optional[str]
    headings: List[str]
    image_url: Optional[str]


# The SchemaRecommendation model represents the recommended schema type for a web page, along with the rationale for the recommendation, the JSON-LD representation of the schema, and the source of the recommendation.
class SchemaRecommendation(BaseModel):
    schema_type: str
    rationale: str
    json_ld: Dict[str, Any]
    source: str

# The LlmDebug model represents the debugging information related to the use of a language model (LLM) in the auditing process, including whether the LLM is enabled, whether it was used, and any error messages if applicable.   
class LlmDebug(BaseModel):
    llm_enabled: bool
    llm_used: bool
    llm_error: Optional[str] = None

# The AuditResponse model represents the overall response structure for an audit request, including the URL of the audited page, the extracted data, the page type, a summary of the geographical relevance, the schema recommendation, and any LLM debugging information.
class AuditResponse(BaseModel):
    url: str
    extracted_data: ExtractedPageData
    page_type: str
    geo_summary: str
    schema_recommendation: SchemaRecommendation
    llm_debug: LlmDebug
    
