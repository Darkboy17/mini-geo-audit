from urllib.parse import urlparse


def classify_page_type(
    url: str,
    title: str | None,
    meta_description: str | None,
    headings: list[str]
) -> str:
    """
    Classify a webpage into one of:
    - Product
    - Article
    - Organization
    - WebPage

    Uses lightweight weighted heuristics based on:
    - URL structure
    - homepage/root detection
    - title/meta/headings keywords
    """


    # Normalize inputs
    parsed = urlparse(url)
    path = parsed.path.lower().strip("/")
    is_homepage = path == ""


    # Normalize inputs to lowercase for keyword matching
    title = (title or "").lower()
    meta_description = (meta_description or "").lower()
    headings_text = " ".join(headings).lower()


    # Combine all text for keyword scanning (weighing URL more heavily)
    text_blob = " ".join([url.lower(), title, meta_description, headings_text])


    # Initialize scores for each type
    scores = {
        "Product": 0,
        "Article": 0,
        "Organization": 0,
        "WebPage": 0,
    }


    # ---------------------------
    # URL path signals
    # ---------------------------
    if any(segment in path for segment in ["product", "pricing", "features", "download", "shop"]):
        scores["Product"] += 3

    if any(segment in path for segment in ["blog", "article", "news", "guide", "tutorial", "docs"]):
        scores["Article"] += 3

    if any(segment in path for segment in ["about", "company", "team", "mission", "contact", "careers"]):
        scores["Organization"] += 3


    # ---------------------------
    # Homepage signals
    # ---------------------------
    if is_homepage:
        scores["Organization"] += 2
        scores["WebPage"] += 2


    # ---------------------------
    # Product signals
    # ---------------------------
    product_keywords = [
        "buy", "price", "pricing", "product", "features", "specifications",
        "shop", "add to cart", "download", "framework", "platform", "tool",
        "software", "application", "api"
    ]


    # ---------------------------
    # Article signals
    # ---------------------------
    article_keywords = [
        "blog", "guide", "article", "news", "insights", "read more",
        "published", "author", "tutorial", "documentation", "docs", "learn"
    ]


    # ---------------------------
    # Organization signals
    # ---------------------------
    org_keywords = [
        "about us", "company", "mission", "team", "services", "contact",
        "careers", "community", "foundation", "official home", "official site"
    ]


    # ---------------------------
    # Weighted keyword scoring
    # ---------------------------
    for keyword in product_keywords:
        if keyword in text_blob:
            scores["Product"] += 1

    for keyword in article_keywords:
        if keyword in text_blob:
            scores["Article"] += 1

    for keyword in org_keywords:
        if keyword in text_blob:
            scores["Organization"] += 1


    # ---------------------------
    # Homepage title/meta refinement
    # ---------------------------
    if "official" in title or "official" in meta_description:
        scores["Organization"] += 2

    if "welcome" in title and is_homepage:
        scores["Organization"] += 1
        scores["WebPage"] += 1


    # ---------------------------
    # Heading pattern refinement
    # ---------------------------
    heading_signals = headings_text

    if any(keyword in heading_signals for keyword in ["download", "docs", "jobs", "community", "news", "get started"]):
        scores["Organization"] += 2
        scores["WebPage"] += 1

    if any(keyword in heading_signals for keyword in ["buy", "pricing", "features", "plans"]):
        scores["Product"] += 2

    if any(keyword in heading_signals for keyword in ["published", "author", "read more", "related articles"]):
        scores["Article"] += 2


    # ---------------------------
    # Default bias toward WebPage if page is generic
    # ---------------------------
    scores["WebPage"] += 1


    # ---------------------------
    # Choose highest score
    # ---------------------------
    best_type = max(scores, key=scores.get)

    return best_type