from urllib.parse import urlparse

def generate_schema(url: str, page_type: str, data: dict) -> dict:
    
    '''Generates a JSON-LD schema based on the page type and content data.
    Args:
        url (str): The URL of the page.
        page_type (str): The inferred type of the page (e.g., "Article", "Product", "Organization").
        data (dict): A dictionary containing extracted content data such as title, description, and image URL.
        Returns:
        dict: A dictionary containing the generated schema type, rationale, and JSON-LD data.'''
    
    
    # Extract domain for potential use in schema generation
    domain = urlparse(url).netloc.replace("www.", "")
    
    
    # Use extracted data to populate schema fields, with fallbacks for missing data
    title = data.get("title") or "Untitled Page"
    description = data.get("meta_description") or ""
    image_url = data.get("image_url")


    # Generate JSON-LD schema based on the inferred page type, with rationale for each choice
    if page_type == "Article":
        json_ld = {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": title,
            "description": description,
            "image": image_url,
            "mainEntityOfPage": url
        }
        rationale = "This page appears content-driven and is best represented as an Article for improved AI citation and search understanding."

    elif page_type == "Product":
        json_ld = {
            "@context": "https://schema.org",
            "@type": "Product",
            "name": title,
            "description": description,
            "image": image_url,
            "url": url
        }
        rationale = "This page appears product-oriented and is best represented as a Product to improve structured product understanding."

    elif page_type == "Organization":
        json_ld = {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": title,
            "url": url,
            "description": description,
            "logo": image_url
        }
        rationale = "This page appears to represent a company or brand entity and is best structured as an Organization."

    else:
        json_ld = {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": title,
            "url": url,
            "description": description
        }
        rationale = "A general WebPage schema is recommended when page intent is broad or ambiguous."

    return {
        "schema_type": page_type if page_type in ["Article", "Product", "Organization"] else "WebPage",
        "rationale": rationale,
        "json_ld": json_ld,
        "source": "rule_based"
    }