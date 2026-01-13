import { marked } from 'marked'
import DOMPurify from 'dompurify'

/**
 * Converts markdown string to sanitized HTML string.
 * @param markdown The raw markdown content.
 * @returns The sanitized HTML as a string.
 */
export async function parseMarkdown(markdown: string): Promise<string> {
  const rawHtml = await marked.parse(markdown)
  return DOMPurify.sanitize(rawHtml)
}
