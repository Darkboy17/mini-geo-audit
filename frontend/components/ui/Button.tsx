import { ButtonHTMLAttributes, ReactNode } from "react";

// Props for the Button component, extending standard button attributes and adding custom ones
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  loading?: boolean;
}


/**
 * A reusable Button component that can display a loading state and is disabled when loading or when the disabled prop is set.
 * It accepts all standard button attributes and additional props for loading state and children content.
 *
 * @param {ButtonProps} props - The properties for the Button component.
 * @returns {JSX.Element} The rendered Button component.
 */
export default function Button({children, loading = false, disabled, ...props}: ButtonProps) {

  // Render the button with appropriate classes and content based on the loading and disabled states
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className="inline-flex items-center justify-center rounded-xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? "Running Audit..." : children}
    </button>
  );
}