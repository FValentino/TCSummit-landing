/**
 * Shared HTML helpers for server actions. The lead-form and contact endpoints are publicly
 * reachable, so any user-provided value that gets embedded into outgoing email HTML must be
 * escaped first to prevent HTML/script injection.
 */

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

/** Escapes then turns newlines into `<br/>`, for multiline free-text bodies. */
export function escapeHtmlMultiline(value: string): string {
  return escapeHtml(value).replace(/\n/g, "<br/>")
}
