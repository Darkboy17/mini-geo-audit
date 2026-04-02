def build_geo_summary(data: dict, page_type: str) -> str:
    
    '''Build a summary of the key signals detected for a given page type.
    Args:
        data (dict): A dictionary containing the signals detected for the page.
        page_type (str): The type of page being analyzed (e.g., "LocalBusiness", "Event", "Product").
    Returns:
        str: A summary of the key signals detected for the page.
    '''
    
    # Initialize an empty list to hold the notes
    notes = []


    # Append notes based on the signals detected
    if data.get("title"):
        notes.append("Page title detected")
    else:
        notes.append("Missing page title")

    if data.get("meta_description"):
        notes.append("Meta description detected")
    else:
        notes.append("Missing meta description")

    if data.get("headings"):
        notes.append("Heading structure detected")
    else:
        notes.append("No headings detected")

    if data.get("image_url"):
        notes.append("At least one image signal detected")
    else:
        notes.append("No clear image signal detected")

    notes.append(f"Recommended structured data opportunity: {page_type}")

    return ". ".join(notes) + "."