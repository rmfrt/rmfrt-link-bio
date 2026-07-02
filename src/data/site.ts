export type Locale = "fr" | "en";

export const locales: Locale[] = ["fr", "en"];
export const defaultLocale: Locale = "fr";

export const siteUrl = (import.meta.env.PUBLIC_SITE_URL || "https://preview.rmfrt.xyz").replace(/\/+$/, "");
export const siteNoindex = import.meta.env.PUBLIC_NOINDEX !== "false";

export function absoluteUrl(path: string): string {
  return new URL(path, `${siteUrl}/`).toString();
}

export const siteIdentity = {
  name: "Rémi Forte",
  handle: "rmfrt",
  ogImage: "/og.svg"
} as const;
