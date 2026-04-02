import Card from "@/components/ui/Card";
import { SchemaRecommendation } from "@/lib/types";

// Props for the SchemaCard component, which includes a single schema recommendation object.
interface SchemaCardProps {
  schema: SchemaRecommendation;
}


/**
 * SchemaCard component displays a recommended structured data schema, including its type, source, and rationale.
 * It uses a Card component for styling and organizes the information in a clear and concise manner.
 *
 * @param {SchemaCardProps} props - The properties for the SchemaCard component, containing the schema recommendation.
 * @returns {JSX.Element} A JSX element representing the SchemaCard component.
 */
export default function SchemaCard({ schema }: SchemaCardProps) {

  // Render the card with the schema recommendation details, including the schema type, source, and rationale.
  return (
    <Card title="Recommended Structured Data">
      <div className="space-y-4">
        <div>
          <p className="text-sm font-medium text-gray-500">Schema Type</p>
          <p className="mt-1 text-base font-semibold text-gray-900">
            {schema.schema_type}
          </p>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-500">Recommendation Source</p>
          <p className="mt-1 text-sm text-gray-800">
            {schema.source === "llm" ? "LLM-enhanced (Groq)" : "Rule-based"}
          </p>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-500">Recommendation Rationale</p>
          <p className="mt-1 text-sm leading-6 text-gray-800">{schema.rationale}</p>
        </div>
      </div>
    </Card>
  );
}