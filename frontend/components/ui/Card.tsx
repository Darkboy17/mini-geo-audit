import { ReactNode } from "react";

// Props for the Card component, including an optional title, children elements, and an optional className for additional styling.
interface CardProps {
  title?: string;
  children: ReactNode;
  className?: string;
}


/**
 * Card component displays a card with an optional title and children elements. It can be styled with an additional className for additional styling.
 * @param {CardProps} props - The properties for the Card component, including an optional title, children elements, and an optional className for additional styling.
 * @returns {JSX.Element} A styled card component with an optional title and children elements.
 */
export default function Card({ title, children, className = "" }: CardProps) {

  // Render the card component with a rounded border, background color, padding, and shadow. If a title is provided, it is displayed at the top of the card.
  return (
    <div className={`rounded-2xl border border-gray-200 bg-white p-6 shadow-sm ${className}`}>
      {title && <h2 className="mb-4 text-lg font-semibold text-gray-900">{title}</h2>}
      {children}
    </div>
  );
}