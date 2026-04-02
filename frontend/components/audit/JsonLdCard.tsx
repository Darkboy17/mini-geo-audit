import Card from "@/components/ui/Card";
import { formatJson } from "@/lib/utils";


// Props for the JsonLdCard component, which takes a JSON-LD object as input and displays it in a formatted manner within a card UI component.
interface JsonLdCardProps {
  jsonLd: Record<string, unknown>;
}


/**
 * JsonLdCard component that renders a card with the recommended JSON-LD output. It takes a JSON-LD object as a prop and formats it for display within a styled card component.
 * @param {JsonLdCardProps} props - The properties for the JsonLdCard component, which includes the JSON-LD object to be displayed.
 * @returns {JSX.Element} A JSX element representing the card with the formatted JSON-LD output.
 */
export default function JsonLdCard({ jsonLd }: JsonLdCardProps) {

  // Render the card component with a title and a preformatted block containing the formatted JSON-LD output. The JSON is displayed in a styled manner for better readability.
  return (
    <Card title="Recommended JSON-LD Output">
      <pre className="overflow-x-auto rounded-xl bg-gray-950 p-4 text-sm leading-6 text-green-300">
        <code>{formatJson(jsonLd)}</code>
      </pre>
    </Card>
  );
}