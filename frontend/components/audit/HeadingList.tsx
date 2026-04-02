
// Props for the HeadingList component, which displays a list of detected headings.
interface HeadingListProps {
  headings: string[];
}


/**
 * HeadingList component renders a list of detected headings from the audit results.
 * If no headings are detected, it shows a message indicating that. Each heading is displayed in a styled list item for better readability.
 * @param {HeadingListProps} props - The props containing the list of headings to display.
 * @returns {JSX.Element} A React component that renders the list of headings or a message if none are detected.
 */
export default function HeadingList({ headings }: HeadingListProps) {

  // If there are no headings detected, display a message to the user.
  if (!headings.length) {
    return <p className="text-sm text-gray-500">No headings detected.</p>;
  }


  // Render the list of detected headings. Each heading is displayed in a styled list item for better readability.
  return (
    <ul className="space-y-2">
      {headings.map((heading, index) => (
        <li
          key={`${heading}-${index}`}
          className="rounded-lg border border-gray-100 bg-gray-50 px-3 py-2 text-sm text-gray-800"
        >
          {heading}
        </li>
      ))}
    </ul>
  );
}