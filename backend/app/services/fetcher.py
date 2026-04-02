import httpx

'''This module provides an asynchronous function to fetch HTML content from a given URL. It handles various exceptions that may occur during the HTTP request, such as timeouts, HTTP errors, and connection issues. The function ensures that the response is of type HTML and raises appropriate error messages for different scenarios, including blocked access and non-HTML content.
'''

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
}


async def fetch_html(url: str) -> str:
    '''Fetches the HTML content of a given URL.
    Args:
        url (str): The URL of the webpage to fetch.
    Returns:
        str: The HTML content of the webpage.
    Raises:
        ValueError: If the URL does not return HTML content, if the request times out, if the website blocks access, or if any other error occurs during fetching.
    '''
    
    try:
        async with httpx.AsyncClient(timeout=15, follow_redirects=True) as client:
            
            # Make the GET request to the specified URL with custom headers
            response = await client.get(url, headers=HEADERS)

            # Check the content type of the response to ensure it's HTML
            content_type = response.headers.get("content-type", "")
            if "text/html" not in content_type:
                raise ValueError("URL did not return HTML content.")

            # Raise an exception for HTTP errors (status codes 4xx and 5xx)
            response.raise_for_status()
            return response.text

    except httpx.TimeoutException:
        raise ValueError("Request timed out while fetching the page.")

    except httpx.HTTPStatusError as e:
        status_code = e.response.status_code

        if status_code == 403:
            raise ValueError("This website blocked automated access (403 Forbidden).")
        elif status_code == 404:
            raise ValueError("Page not found (404).")
        elif status_code == 999:
            raise ValueError("This website blocked scraping requests (LinkedIn-style anti-bot protection).")
        else:
            raise ValueError(f"We couldn’t audit this page because the website returned an unexpected response. Please try another public webpage URL.")

    except httpx.RequestError:
        raise ValueError("Failed to connect to the website.")

    except Exception as e:
        raise ValueError(str(e))