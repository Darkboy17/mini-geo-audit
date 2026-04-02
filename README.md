# Mini GEO Audit Prototype

## Overview
Mini GEO Audit is a full-stack prototype that analyzes a public webpage and recommends a useful JSON-LD structured data schema for SEO / GEO use cases.

The system extracts lightweight on-page signals such as:
- Page title
- Meta description
- Headings
- Representative image

It then:
1. Classifies the likely page intent
2. Summarizes the page’s machine-readable signals
3. Recommends a schema.org JSON-LD object
4. Optionally uses an LLM (Groq) to improve schema recommendations on ambiguous pages

---

## 1) Setup Instructions

### Tech Stack

**Frontend**
- Next.js (App Router)
- TypeScript
- Tailwind CSS

**Backend**
- FastAPI
- BeautifulSoup4
- httpx
- Pydantic

**Optional LLM Layer**
- Groq API

---

## Project Structure

```bash
mini-geo-audit/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── __main__.py
│   │   ├── main.py
│   │   ├── api/
│   │   │   └── routes/
│   │   │       └── audit.py
│   │   ├── core/
│   │   │   └── config.py
│   │   ├── models/
│   │   │   └── audit.py
│   │   └── services/
│   │       ├── fetcher.py
│   │       ├── extractor.py
│   │       ├── classifier.py
│   │       ├── geo_summary.py
│   │       ├── schema_generator.py
│   │       └── llm_schema.py
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── lib/
│   │   └── types/
│   ├── next.config.ts
│   ├── package.json
│   └── .env.local
│
└── README.md
```

---

## Backend Setup

### 1. Create and activate a virtual environment

**Windows (PowerShell):**
```bash
cd backend
python -m venv venv
venv\Scripts\Activate
```

**macOS / Linux:**
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
```

### 2. Install dependencies
```bash
pip install -r requirements.txt
```

### 3. Create `.env`
Inside `backend/.env`:

```env
GROQ_API_KEY=your_groq_api_key_here
GROQ_MODEL=your_groq_model_here
USE_LLM_SCHEMA=true
```

### 4. Run backend
```bash
python -m app
```

Backend will run at:
```text
http://127.0.0.1:8000
```

Swagger docs:
```text
http://127.0.0.1:8000/docs
```
---

## Using the Backend API Directly

If you only want to use the backend API, you can run and test it independently without starting the Next.js frontend.


## Available API Endpoints

### `GET /`
Simple health / welcome route.

Example:
```bash
curl http://127.0.0.1:8000/
```

Expected response:
```json
{
  "message": "Welcome to the Page Audit API! Please use the /audit endpoint to analyze a web page."
}
```

---

### `POST /audit`
Main endpoint used to analyze a webpage.

### Request body
```json
{
  "url": "https://fastapi.tiangolo.com/",
  "use_llm": true
}
```

### Example using `curl`
```bash
curl -X POST "http://127.0.0.1:8000/api/v1/audit" -H "Content-Type: application/json" -d "{\"url\":\"https://fastapi.tiangolo.com/\",\"use_llm\":true}"
```

### Example response
```json
{
  "url": "https://fastapi.tiangolo.com/",
  "extracted_data": {
    "title": "FastAPI",
    "meta_description": "FastAPI framework, high performance, easy to learn, fast to code, ready for production",
    "headings": ["FastAPI", "Sponsors", "Installation"],
    "image_url": "https://fastapi.tiangolo.com/assets/images/social/index.png"
  },
  "page_type": "Product",
  "geo_summary": "Page title detected. Meta description detected. Heading structure detected. At least one image signal detected. Recommended structured data opportunity: Product.",
  "schema_recommendation": {
    "schema_type": "SoftwareApplication",
    "rationale": "The page appears to represent a software framework.",
    "json_ld": {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "FastAPI",
      "description": "FastAPI framework, high performance, easy to learn, fast to code, ready for production",
      "image": "https://fastapi.tiangolo.com/assets/images/social/index.png",
      "url": "https://fastapi.tiangolo.com/"
    },
    "source": "llm"
  },
  "llm_debug": {
    "llm_enabled": true,
    "llm_used": true,
    "llm_error": null
  }
}
```

## Audit via Swagger Docs

You can also test the backend interactively using FastAPI’s built-in Swagger UI.

### Open Swagger Docs

After starting the backend, visit:
```
http://127.0.0.1:8000/docs
```

### How to use it

1.  Open the **`POST /audit`** endpoint
2.  Click **“Try it out”**
3.  Enter a request body like this:
 ```json
{  
    "url": "https://fastapi.tiangolo.com/",  
    "use_llm": true  
}
```

4.  Click **“Execute”**

Swagger will return the full audit response, including:

-   extracted page data
-   detected page type
-   GEO summary
-   schema recommendation
-   LLM debug info

### Notes
- Set `use_llm` to `true` if you want to allow the Groq-powered schema recommendation.
- Set `use_llm` to `false` if you want only the deterministic rule-based flow.
- If omitted, backend behavior depends on your implementation defaults.


---

## Frontend Setup

### 1. Install dependencies
```bash
cd frontend
npm install
```

### 2. Create `.env.local`
Inside `frontend/.env.local`:

```env
NEXT_PUBLIC_APP_NAME=Mini GEO Audit
BACKEND_API_URL=http://127.0.0.1:8000/api/v1
```

### 3. Run frontend
```bash
npm run dev
```

Frontend will run at:
```text
http://localhost:3000
```

---

## 2) Architecture Overview

## High-Level Flow

```text
User enters URL in frontend
        ↓
Frontend sends POST request to FastAPI backend
        ↓
Backend fetches HTML
        ↓
Backend extracts page signals
        ↓
Rule-based classifier predicts page intent
        ↓
Schema recommendation is generated
        ↓
Optional LLM improves recommendation
        ↓
Structured result is returned to frontend
```

---

## Backend Architecture

### `fetcher.py`
Responsible for safely fetching HTML from a public URL.

### `extractor.py`
Extracts lightweight page signals:
- title
- meta description
- headings
- image

### `classifier.py`
Classifies the page into a likely intent such as:
- Product
- Article
- Organization
- WebPage

### `geo_summary.py`
Creates a concise summary of what machine-readable signals were found.

### `schema_generator.py`
Generates a safe rule-based JSON-LD recommendation.

### `llm_schema.py`
Optionally uses Groq to recommend a more semantically useful schema when enabled.

### `audit.py`
Main API route that coordinates the full audit flow.

---

## Frontend Architecture

### Core responsibilities
- Collect URL input
- Allow optional LLM toggle
- Submit audit request
- Display extracted data and schema recommendation
- Surface errors clearly

### Component design
Frontend was kept intentionally modular and simple:
- form/input handling
- result display
- image preview
- JSON-LD preview
- loading and error states

---

## 3) Design Decision Log

This section documents how I approached the problem step by step.

---

## Step 1 — Problem Breakdown

The assignment asks for a tool that can:
1. Accept a public webpage URL
2. Extract useful page signals
3. Identify likely structured data opportunities
4. Recommend a JSON-LD schema
5. Optionally use an LLM in a thoughtful way

So I broke the system into 5 main responsibilities:
- URL fetching
- HTML parsing
- page classification
- schema recommendation
- frontend visualization

This helped keep the system modular and easier to debug.

---

## Step 2 — Choosing What to Extract

### Chosen approach
I intentionally focused on a **lightweight set of page signals** (as required in the assessment):
- title
- meta description
- headings
- representative image

### Why I chose this
These are:
- widely available across websites
- easy to extract reliably
- strong enough for a working prototype
- directly relevant to GEO / SEO interpretation

### Alternatives considered
I considered extracting more advanced signals such as:
- canonical tags
- breadcrumb structure
- nav labels
- existing JSON-LD
- repeated content sections
- author/date/product metadata

### Why I did not prioritize them initially
Because the assignment asked for a **working prototype**, I chose to keep the extraction layer focused and reliable first before expanding into deeper structural parsing.

---

## Step 3 — Rule-Based Classification vs LLM Classification

### Chosen approach
I used a **rule-based classifier first**, and made the **LLM optional**.

### Why I chose this
Rule-based logic is:
- faster
- cheaper
- easier to debug
- more deterministic

For many pages, useful clues already exist in:
- the URL
- title
- headings
- page wording

So it made sense to use deterministic logic first.

### Alternatives considered
I considered making the LLM responsible for all classification and schema decisions.

### Why I did not choose that
A fully LLM-driven system would be:
- slower
- more expensive
- less predictable
- harder to validate

For this project, I wanted the LLM to act as a **semantic enhancement layer**, not as the only source of truth.

---

## Step 4 — Why I Used an Optional LLM Layer

### Where I chose to use the LLM
I used the Groq API to optionally improve the schema recommendation.

### Why I used it there
This is where the LLM adds the most value:
- handling ambiguous pages
- choosing a better semantic schema type
- producing a more useful rationale
- improving machine-readable interpretation beyond simple keyword matching

### Where I intentionally did NOT use the LLM
I intentionally did **not** use the LLM for:
- fetching HTML
- extracting metadata
- parsing headings
- finding image URLs
- basic signal detection

### Why I avoided using the LLM there
Because those tasks are better handled with deterministic code.

Using an LLM for tasks that are already reliably solvable with standard parsing would:
- add latency
- increase cost
- reduce reproducibility
- make debugging harder

So my design choice was:

> Use deterministic logic for extraction, and use the LLM only where semantic reasoning is genuinely helpful.

---

## Step 5 — Choosing Minimal JSON-LD Over Over-Generated Schema

### Chosen approach
I intentionally kept the schema recommendation **minimal but useful**.

### Why I chose this
I only included fields that could be reasonably inferred, such as:
- `@context`
- `@type`
- `name`
- `description`
- `image`
- `url`

### Alternatives considered
I considered generating richer schema with fields like:
- author
- publish date
- offers
- price
- aggregate rating
- brand
- publisher

### Why I avoided that by default
Because incorrect structured data is worse than incomplete structured data.

I wanted the output to be:
- useful
- realistic
- low-risk
- explainable

This was especially important when the recommendation is based on limited visible page signals.

---

## Step 6 — Handling Real-World Edge Cases

### Edge cases encountered
Some websites:
- block automated traffic
- return anti-bot responses
- fail on redirects
- do not expose consistent metadata

### Chosen approach
I added explicit error handling and user-friendly backend/frontend messages.

### Why I chose this
A prototype should fail gracefully.

Instead of exposing raw backend exceptions directly to the user, I tried to convert failures into more understandable product-level messages.

### Alternatives considered
The alternative would have been to simply surface raw HTTP or parsing errors.

### Why I avoided that
Because it makes the user experience worse and doesn’t reflect how a production-oriented audit tool should behave.

---

## 4) Assumptions

This prototype makes the following assumptions:

- The input URL is publicly accessible.
- The target page is mostly static HTML or at least server-rendered enough to expose useful metadata.
- The representative image can be inferred from common tags such as Open Graph or image elements.
- A lightweight signal set is sufficient for a first-pass structured data recommendation.
- The goal is recommendation and audit support, not guaranteed semantic correctness for every website.

---

## 5) Known Limitations

### 1. Limited page understanding
The current extraction layer is intentionally lightweight.

It works well for a prototype, but more complex or mixed-purpose pages (such as homepages, docs sites, or landing pages) may still be harder to classify perfectly.

### 2. Some sites block automated access
Certain sites may return:
- 403
- 999
- anti-bot pages
- consent walls

In those cases, the system cannot reliably audit the page content.

### 3. LLM output is constrained intentionally
The LLM layer is useful, but it is intentionally restricted and validated to avoid over-generating unsafe or speculative schema.

### 4. Not yet designed for full-site crawling
The current system is optimized for **single-page audits**, not large-scale multi-page website analysis.

### 5. Image extraction is heuristic-based
Representative image detection may not always select the best visual if a site has multiple possible candidates.

---

## 6) Future Improvements

If I had more time, I would improve the system by adding:

- richer structural extraction
- confidence scoring for classification
- existing structured data detection
- sitemap / multi-page website auditing
- background job processing
- site-level reporting and recommendations
- stronger schema validation and grounding

---

## 7) Final Notes

This project was intentionally designed to be:
- modular
- explainable
- easy to extend
- practical for the scope of the assessment

The main design philosophy was:

> Use deterministic logic where it is reliable, and use the LLM only where semantic reasoning adds meaningful value.

That tradeoff helped keep the system both practical and thoughtful.


