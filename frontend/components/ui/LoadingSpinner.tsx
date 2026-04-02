/**
 * A simple loading spinner component.
 * It uses Tailwind CSS classes to create a spinning animation.
 * The spinner is a small circle with a border that spins indefinitely.
 */
export default function LoadingSpinner() {
  return (
    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
  );
}