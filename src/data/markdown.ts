const LINK_PATTERN = /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g;

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function escapeAttribute(value: string): string {
  return escapeHtml(value).replace(/`/g, "&#96;");
}

export function renderInlineMarkdown(value: string): string {
  let html = "";
  let lastIndex = 0;

  for (const match of value.matchAll(LINK_PATTERN)) {
    const [fullMatch, label, href] = match;
    const index = match.index || 0;

    html += renderEmphasis(value.slice(lastIndex, index));
    html += `<a href="${escapeAttribute(href)}" target="_blank" rel="noopener noreferrer">${renderEmphasis(
      label
    )}</a>`;
    lastIndex = index + fullMatch.length;
  }

  html += renderEmphasis(value.slice(lastIndex));
  return html;
}

function renderEmphasis(value: string): string {
  return escapeHtml(value).replace(/\*([^*]+)\*/g, "<em>$1</em>");
}
