import type { Locale } from "./site";

type LinkItem = {
  href: string;
  label: Record<Locale, string>;
  note?: Record<Locale, string>;
  rel?: string;
};

const contactEmail = import.meta.env.PUBLIC_CONTACT_EMAIL;

const contactLink: LinkItem | null = contactEmail
  ? {
      href: `mailto:${contactEmail}`,
      label: { fr: "Contact", en: "Contact" },
      note: { fr: "Email", en: "Email" }
    }
  : null;

export const primaryLinks: LinkItem[] = [
  {
    href: "/en/resume/",
    label: { fr: "CV", en: "Resume" },
    note: { fr: "CV en anglais", en: "Resume in English" }
  },
  {
    href: "https://www.typolyon.fr/",
    label: { fr: "TypoLyon", en: "TypoLyon" },
    note: { fr: "Cycle de conférences", en: "Lecture series" }
  },
  ...(contactLink ? [contactLink] : [])
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
  return href.startsWith("http://") || href.startsWith("https://") || href.startsWith("mailto:");
}
