/**
 * Converts a string to Title Case.
 * Example: "crude helmet" -> "Crude Helmet"
 * Example: "boots of speed" -> "Boots of Speed" (if we want to handle small words)
 * For simplicity and consistency with game titles, we'll capitalize every word.
 */
export function toTitleCase(str: string): string {
  if (!str) return str;
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}
