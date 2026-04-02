"use client";

import { useState } from "react";
import AuditForm from "@/components/audit/AuditForm";
import AuditSummaryCard from "@/components/audit/AuditSummaryCard";
import ExtractedDataCard from "@/components/audit/ExtractedDataCard";
import SchemaCard from "@/components/audit/SchemaCard";
import JsonLdCard from "@/components/audit/JsonLdCard";
import { runAudit } from "@/lib/api";
import { AuditResponse } from "@/lib/types";


/**
 * The main page component for the application.
 * This component manages the state for the audit results, loading status, and server errors. It renders the audit form and displays the results in various cards once the audit is complete.
 * @returns {JSX.Element} The rendered home page component.
 */
export default function HomePage() {

  // State to hold the audit results, loading status, and any server errors
  const [auditResult, setAuditResult] = useState<AuditResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");


  // Function to handle the audit process when the form is submitted. It calls the runAudit function and updates the state based on the response or any errors that occur.
  async function handleRunAudit(url: string, use_llm: boolean) {

    try {

      // Set loading to true, clear any previous server errors and audit results before starting the new audit process
      setLoading(true);
      setServerError("");
      setAuditResult(null);

      // Call the runAudit function with the provided URL and LLM usage flag, and update the audit result state with the response
      const result = await runAudit({ url, use_llm });
      setAuditResult(result);

    } catch (error) {

      // If an error occurs during the audit process, extract the error message and update the server error state to display it to the user
      const message =
        error instanceof Error ? error.message : "Something went wrong.";
      setServerError(message);

    } finally {

      // Set loading to false after the audit process is complete, regardless of success or failure
      setLoading(false);

    }
  }


  // Render the main home page component, including the header section, the audit form, and the results section that displays the audit summary, schema recommendation, extracted data, and JSON-LD if available. It also handles displaying any server errors that may occur during the audit process.
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-6xl space-y-10">
        <section className="space-y-3">
          <p className="text-sm font-medium uppercase tracking-wide text-gray-500">
            Villion Inc.
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-gray-950">
            Mini GEO Audit
          </h1>
          <p className="max-w-2xl text-base leading-7 text-gray-600">
            Analyze a public webpage for AI citation readiness and structured data opportunities. This application helps evaluate whether a webpage is easy for AI search engines to understand and recommends structured data that can improve its AI citation readiness.
          </p>
        </section>

        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <AuditForm onSubmit={handleRunAudit} loading={loading} />
          {serverError && (
            <p className="mt-4 text-sm text-red-600">{serverError}</p>
          )}
        </section>

        {auditResult && (
          <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <AuditSummaryCard
              pageType={auditResult.page_type}
              geoSummary={auditResult.geo_summary}
            />
            <SchemaCard schema={auditResult.schema_recommendation} />
            <ExtractedDataCard data={auditResult.extracted_data} />
            <JsonLdCard jsonLd={auditResult.schema_recommendation.json_ld} />
          </section>
        )}
      </div>
    </main>
  );
}