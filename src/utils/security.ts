/**
 * Safely stringifies an object to JSON for use in a <script type="application/ld+json"> tag.
 * Escapes characters that could be used for XSS or script breakout, such as <, >, and &.
 *
 * @param obj The object to stringify
 * @returns A safe JSON string
 */
export function safeJsonStringify(obj: unknown): string {
  return JSON.stringify(obj)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}
