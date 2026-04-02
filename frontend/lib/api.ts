import { AuditRequest, AuditResponse, ApiErrorResponse } from "@/lib/types";


/**
 * Sends a request to the backend API to run an audit with the given payload.
 * @param payload The audit request payload containing the necessary parameters.
 * @returns A promise that resolves to the audit response from the backend.
 * @throws An error if the API request fails or returns an error response.
 */
export async function runAudit(payload: AuditRequest): Promise<AuditResponse> {

  // Send a POST request to the /api/audit endpoint with the payload
  const response = await fetch("/api/audit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });


  // Parse the JSON response from the backend
  const data = await response.json();


  // If the response is not OK, throw an error with the detail from the API error response
  if (!response.ok) {
    const error = data as ApiErrorResponse;
    throw new Error(error.detail || "Failed to run audit.");
  }

  return data as AuditResponse;
}