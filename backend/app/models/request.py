from pydantic import BaseModel, HttpUrl
from typing import Optional

'''
This module defines the data model for an audit request, which includes a URL and an optional flag to indicate whether to use a language model (LLM) for the audit process.
'''

# The AuditRequest class inherits from BaseModel, which provides data validation and serialization capabilities. The url field is of type HttpUrl, ensuring that the input is a valid URL. The use_llm field is an optional boolean that indicates whether to utilize a language model for the audit.
class AuditRequest(BaseModel):
    url: HttpUrl
    use_llm: Optional[bool] = None