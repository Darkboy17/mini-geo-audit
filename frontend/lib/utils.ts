
/**
 * Formats a value as a JSON string with indentation for readability.
 * @param value - The value to format as JSON.
 * @returns A formatted JSON string representation of the value.
 */
export function formatJson(value: unknown): string {
  return JSON.stringify(value, null, 2);
}


/**
 * Checks if a given string is a valid HTTP or HTTPS URL.
 * @param value - The string to validate as a URL.
 * @returns True if the string is a valid HTTP or HTTPS URL, false otherwise.
 */
export function isValidHttpUrl(value: string): boolean {

  try {

    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";

  } catch {

    return false;
    
  }
}