import json
from groq import Groq
from app.core.config import GROQ_API_KEY, GROQ_MODEL

# Initialize Groq client
client = Groq(api_key=GROQ_API_KEY)


def enhance_schema_with_llm(url: str, extracted_data: dict, rule_based_page_type: str) -> dict:
    """
    Uses Groq LLM to generate a smarter JSON-LD recommendation
    based on extracted page context.
    """

    # Validate API key
    if not GROQ_API_KEY:
        raise ValueError("Missing GROQ_API_KEY.")


    # Extract page signals
    title = extracted_data.get("title")
    meta_description = extracted_data.get("meta_description")
    headings = extracted_data.get("headings", [])
    image_url = extracted_data.get("image_url")


    # Build prompt
    prompt = f"""
                You are an expert in SEO, GEO (Generative Engine Optimization), and schema.org structured data.

                Your task is to recommend the SINGLE most appropriate high-level schema.org JSON-LD type for a webpage based only on the extracted page signals below.

                You must choose exactly ONE of these schema types:
                - Organization
                - Product
                - Article
                - WebPage

                Your goal is to recommend the MOST USEFUL and MOST SPECIFIC type that best represents the page's PRIMARY purpose.

                Important decision rules:
                - Do NOT default to "WebPage" unless the page is truly generic or lacks strong signals for a more specific type.
                - If the page appears to be an official homepage or main web presence for a brand, company, project, nonprofit, community, or ecosystem, prefer "Organization".
                - If the page appears to represent a software tool, platform, framework, product offering, app, or commercial solution, prefer "Product".
                - If the page appears to be primarily informational content such as a blog post, guide, tutorial, news post, or editorial content, prefer "Article".
                - Use "WebPage" only when the page is too generic, ambiguous, or mixed-purpose to justify a stronger recommendation.

                Strict constraints:
                - Be conservative and realistic.
                - Use ONLY facts that can reasonably be inferred from the provided inputs.
                - Do NOT invent author names, prices, ratings, dates, logos, offers, reviews, or organization details unless they are explicitly inferable.
                - Keep the JSON-LD minimal but useful.
                - Prefer practical SEO/GEO usefulness over technically trivial classifications.
                - The JSON-LD should represent the main page entity or purpose as clearly as possible.
                - Return RAW JSON only.
                - No markdown.
                - No code fences.
                - No commentary before or after the JSON.

                Output format (must match exactly):
                {{
                "schema_type": "Organization | Product | Article | WebPage",
                "rationale": "Short explanation of why this is the best fit for the page's primary purpose.",
                "json_ld": {{
                        "@context": "https://schema.org",
                        "@type": "Organization | Product | Article | WebPage",
                        "name": "if inferable",
                        "description": "if inferable",
                        "url": "if inferable",
                        "image": "if inferable"
                    }}
                }}
                
                Rules for json_ld:
                - Always include "@context" and "@type".
                - Include "name" if the page/entity name is reasonably inferable.
                - Include "description" if a reliable page description is available.
                - Include "url" if the page URL is known.
                - Include "image" if a representative image URL is available.
                - Do not include fields with empty values.
                - Do not invent unsupported facts.

                Additional guidance:
                - If the page is the root homepage of a well-known project, language, framework, or ecosystem, "Organization" is often better than "Article" or generic "WebPage".
                - If the page is clearly centered around a downloadable framework, app, platform, or developer tool, "Product" may be more useful than "WebPage".
                - If the page contains docs/tutorial-style structure but is actually the main homepage of a product or ecosystem, do NOT classify it as "Article" unless the page is clearly a single content piece.
                - The rule-based page type below is only a hint, not a fact. You may disagree with it if the extracted signals suggest a better schema type.

                Webpage URL:
                {url}

                Rule-based detected page type:
                {rule_based_page_type}

                Extracted page data:
                Title: {title}
                Meta Description: {meta_description}
                Headings: {headings}
                Image URL: {image_url}
            """


    # Generate response
    response = client.chat.completions.create(
        model=GROQ_MODEL,
        messages=[
            {"role": "system", "content": "You return only valid JSON."},
            {"role": "user", "content": prompt},
        ],
        temperature=0.2,
    )


    # Get raw output from Groq
    raw_output = response.choices[0].message.content.strip()


    # For debugging purposes
    print("\n===== GROQ RAW OUTPUT =====")
    print(raw_output)
    print("===== END GROQ RAW OUTPUT =====\n")


    # Strip markdown fences if Groq wraps JSON
    if raw_output.startswith("```"):
        raw_output = raw_output.strip("`")
        raw_output = raw_output.replace("json", "", 1).strip()


    # Try to parse JSON
    try:
        parsed = json.loads(raw_output)
        parsed["source"] = "llm"
        parsed["raw_llm_output"] = response.choices[0].message.content.strip()
        return parsed
    except json.JSONDecodeError as e:
        raise ValueError(f"LLM returned invalid JSON. Raw output: {raw_output}") from e