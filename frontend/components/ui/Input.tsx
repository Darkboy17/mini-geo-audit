import { InputHTMLAttributes } from "react";


// Props for the Input component, extending the standard HTML input attributes
type Props = InputHTMLAttributes<HTMLInputElement>;


/**
 * A reusable Input component that accepts all standard HTML input attributes.
 * It applies consistent styling and can be used across the application wherever an input field is needed.
 *
 * @param props - The properties passed to the input element, including standard HTML input attributes.
 * @returns A styled input element that can be used in forms or other user input scenarios.
 */
export default function Input(props: Props) {
  return (
    <input
      {...props}
      className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-black"
    />
  );
}