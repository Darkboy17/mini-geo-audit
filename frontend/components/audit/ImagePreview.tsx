import Image from 'next/image';

// Props for the ImagePreview component, which displays a preview of the detected image.
interface ImagePreviewProps {
  imageUrl: string | null;
}


/**
 * ImagePreview component displays a preview of the detected image.
 * If no image is detected, it shows a message indicating that.
 * @param {ImagePreviewProps} props - The props containing the image URL to display.
 * @returns {JSX.Element} A React component that renders the image preview or a message if no image is detected.
 */
export default function ImagePreview({ imageUrl }: ImagePreviewProps) {

  // If there is no image URL, display a message indicating that no image was detected.
  if (!imageUrl) {
    return <p className="text-sm text-gray-500">No image detected.</p>;
  }


  // If an image URL is provided, render the image using the Next.js Image component for optimized loading and display.
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200">
      <div className="relative h-64 w-auto">
        <Image
          src={imageUrl}
          alt="Detected page visual"
          fill
          className="object-cover"
          unoptimized
        />
      </div>
    </div>
  );
}