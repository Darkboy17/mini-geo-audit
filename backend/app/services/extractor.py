from bs4 import BeautifulSoup
from urllib.parse import urljoin


def extract_page_data(html: str, base_url: str) -> dict:
    '''Extracts title, meta description, headings, and image URL from HTML content.'''
    
    # Parse the HTML content using BeautifulSoup
    soup = BeautifulSoup(html, "lxml")


    # Extract title
    title = soup.title.string.strip() if soup.title and soup.title.string else None


    # Extract meta description
    meta_tag = soup.find("meta", attrs={"name": "description"})
    meta_description = (
        meta_tag.get("content").strip()
        if meta_tag and meta_tag.get("content")
        else None
    )


    # Extract headings
    headings = []
    for tag in soup.find_all(["h1", "h2", "h3"]):
        text = tag.get_text(strip=True)
        if text:
            headings.append(text)


    # Extract image URL
    image_url = None
    og_image = soup.find("meta", property="og:image")
    if og_image and og_image.get("content"):
        image_url = urljoin(base_url, og_image["content"])
    else:
        img = soup.find("img")
        if img and img.get("src"):
            image_url = urljoin(base_url, img["src"])

    return {
        "title": title,
        "meta_description": meta_description,
        "headings": headings[:10],
        "image_url": image_url,
    }