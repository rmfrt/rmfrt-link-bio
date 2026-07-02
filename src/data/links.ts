import type { Locale } from "./site";

type LinkItem = {
  href?: string;
  kind?: "email";
  label: Record<Locale, string>;
  rel?: string;
};

export const primaryLinks: LinkItem[] = [
  {
    kind: "email",
    label: { fr: "Email", en: "Email" }
  },
  {
    href: "/en/resume/",
    label: { fr: "CV", en: "Resume" }
  },
  {
    href: "https://www.typolyon.fr/",
    label: { fr: "TypoLyon", en: "TypoLyon" }
  }
];

export const secondaryLinks: LinkItem[] = [
  {
    href: "https://bsky.app/profile/rmfrt.com",
    label: { fr: "Bluesky", en: "Bluesky" },
    rel: "me"
  },
  {
    href: "https://www.instagram.com/rmfrt/",
    label: { fr: "Instagram", en: "Instagram" },
    rel: "me"
  },
  {
    href: "https://www.linkedin.com/in/rmfrt/",
    label: { fr: "LinkedIn", en: "LinkedIn" },
    rel: "me"
  }
];

export function isExternalUrl(href: string): boolean {
  return href.startsWith("http://") || href.startsWith("https://");
}
