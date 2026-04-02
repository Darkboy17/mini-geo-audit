import { NextRequest, NextResponse } from "next/server";

// Ensure that the backend API URL is defined in environment variables
const BACKEND_API_URL = process.env.BACKEND_API_URL;


/**
 * 
 * @param request user request containing the URL to audit and an optional flag to use LLM for analysis
 * @returns JSON response with audit results or error details
 */
export async function POST(request: NextRequest) {

  try {

    // Parse the request body to extract the URL and optional LLM flag
    const body = await request.json();


    // Validate that the URL is provided in the request body
    if (!body?.url) {
      return NextResponse.json(
        { detail: "URL is required." },
        { status: 400 }
      );
    }


    // Check if the backend API URL is configured in environment variables
    if (!BACKEND_API_URL) {
      return NextResponse.json(
        { detail: "Backend API URL is not configured." },
        { status: 500 }
      );
    }


    // Forward the audit request to the backend API, including the URL and LLM flag in the request body
    const response = await fetch(`${BACKEND_API_URL}/audit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: body.url, use_llm: body.use_llm }),
      cache: "no-store",
    });


    // Parse the response from the backend API
    const data = await response.json();


    // If the backend API response is not successful, return an error response with details from the backend
    if (!response.ok) {
      return NextResponse.json(
        { detail: data?.detail || "Backend audit request failed." },
        { status: response.status }
      );
    }


    // Return the successful audit results from the backend API to the frontend
    return NextResponse.json(data, { status: 200 });

  } catch {
    

    // Handle any unexpected errors that occur during the request processing and return a generic error response
    return NextResponse.json(
      { detail: "Unexpected error while processing audit request." },
      { status: 500 }
    );

  }
}