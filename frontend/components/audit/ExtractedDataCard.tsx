import Card from "@/components/ui/Card";
import HeadingList from "@/components/audit/HeadingList";
import ImagePreview from "@/components/audit/ImagePreview";
import { ExtractedPageData } from "@/lib/types";


// Props for the ExtractedDataCard component, which displays extracted page data such as title, meta description, headings, and detected image.
interface ExtractedDataCardProps {
  data: ExtractedPageData;
}


/**
 * ExtractedDataCard component displays the extracted page data including the page title, meta description, detected headings, and detected image. It uses the Card component for layout and includes HeadingList and ImagePreview components to display the respective data.
 * @param {ExtractedDataCardProps} props - The props for the ExtractedDataCard component, which includes the extracted page data.
 * @return {JSX.Element} The JSX element representing the ExtractedDataCard component.
 */
export default function ExtractedDataCard({ data }: ExtractedDataCardProps) {

  // Render the ExtractedDataCard component with the extracted page data.
  return (
    <Card title="Extracted Page Data">
      <div className="space-y-6">
        <div>
          <p className="text-sm font-medium text-gray-500">Page Title</p>
          <p className="mt-1 text-sm text-gray-900">{data.title || "Not detected"}</p>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-500">Meta Description</p>
          <p className="mt-1 text-sm leading-6 text-gray-800">
            {data.meta_description || "Not detected"}
          </p>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-500">Detected Headings</p>
          <div className="mt-2">
            <HeadingList headings={data.headings} />
          </div>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium text-gray-500">Detected Image</p>
          <ImagePreview imageUrl={data.image_url} />
        </div>
      </div>
    </Card>
  );
}