type LinkItem = {
  href?: string;
  kind?: "email";
  label: string;
  rel?: string;
};

export const primaryLinks: LinkItem[] = [
  {
    kind: "email",
    label: "Email"
  },
  {
    href: "/resume/",
    label: "Resume"
  },
  {
    href: "https://www.typolyon.fr/",
    label: "TypoLyon"
  }
];

export const secondaryLinks: LinkItem[] = [
  {
    href: "https://bsky.app/profile/rmfrt.com",
    label: "Bluesky",
    rel: "me"
  },
  {
    href: "https://www.instagram.com/rmfrt/",
    label: "Instagram",
    rel: "me"
  },
  {
    href: "https://www.linkedin.com/in/rmfrt/",
    label: "LinkedIn",
    rel: "me"
  }
];

export function isExternalUrl(href: string): boolean {
  return href.startsWith("http://") || href.startsWith("https://");
}
