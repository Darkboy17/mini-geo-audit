"use client";

import { useState } from "react";


// Prop types for the AuditForm component.
interface AuditFormProps {
  onSubmit: (url: string, useLlm: boolean) => void;
  loading?: boolean;
}


/**
 * AuditForm is a React component that renders a form for users to input a webpage URL and choose whether to use AI-enhanced schema recommendation. It manages the form state and handles form submission, calling the provided onSubmit function with the URL and LLM preference.
 * Props:
 * - onSubmit: A function that is called when the form is submitted. It receives the URL and a boolean indicating whether to use LLM.
 * - loading: An optional boolean that indicates whether the form is in a loading state, which disables the submit button and changes its text.
 */
export default function AuditForm({ onSubmit, loading = false }: AuditFormProps) {

  // State for the URL input and the LLM checkbox.
  const [url, setUrl] = useState("");
  const [useLlm, setUseLlm] = useState(true);


  // Handle form submission by preventing the default behavior, validating the URL, and calling the onSubmit function with the trimmed URL and LLM preference.
  const handleSubmit = (e: React.FormEvent) => {

    // Prevent the default form submission behavior.
    e.preventDefault();

    // Validate that the URL is not empty after trimming whitespace. If it is empty, do not proceed with submission.
    if (!url.trim()) return;

    // Call the onSubmit function with the trimmed URL and the LLM preference.
    onSubmit(url.trim(), useLlm);

  };


  // Render the form with an input for the URL, a checkbox for the LLM option, and a submit button. The submit button is disabled and shows "Auditing..." when loading is true.
  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div>
        <label htmlFor="url" className="mb-2 block text-sm font-medium text-gray-700">
          Enter a webpage URL
        </label>
        <input
          id="url"
          type="url"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-500 outline-none transition focus:border-black"
          required
        />
      </div>

      <label className="flex items-center gap-3 text-sm text-gray-700">
        <input
          type="checkbox"
          checked={useLlm}
          onChange={(e) => setUseLlm(e.target.checked)}
          className="h-4 w-4 rounded border-gray-300"
        />
        Use AI-enhanced schema recommendation
      </label>

      <button
        type="submit"
        disabled={loading}
        className="rounded-xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Auditing..." : "Run Audit"}
      </button>
    </form>
  );
}