import Card from "@/components/ui/Card";


// Props for the AuditSummaryCard component. It includes the detected page type and a summary of the GEO insights.
interface AuditSummaryCardProps {
  pageType: string;
  geoSummary: string;
}


/**
 * AuditSummaryCard component displays a summary of the audit results, including the detected page type and a GEO insight summary.
 * @param {AuditSummaryCardProps} props - The properties for the AuditSummaryCard component.
 * @returns {JSX.Element} The rendered AuditSummaryCard component.
 */
export default function AuditSummaryCard({pageType, geoSummary}: AuditSummaryCardProps) {

  // Render the card with the audit summary information. It includes the detected page type and the GEO insight summary.
  return (
    <Card title="Audit Summary">
      <div className="space-y-4">
        <div>
          <p className="text-sm font-medium text-gray-500">Detected Page Type</p>
          <p className="mt-1 text-base font-semibold text-gray-900">{pageType}</p>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-500">GEO Insight</p>
          <p className="mt-1 text-sm leading-6 text-gray-800">{geoSummary}</p>
        </div>
      </div>
    </Card>
  );
}