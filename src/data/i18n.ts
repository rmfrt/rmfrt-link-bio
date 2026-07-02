import type { Locale } from "./site";

export const homeContent = {
  fr: {
    title: "Rémi Forte",
    description: "Programme poétique, systèmes typographiques, design graphique et code.",
    eyebrow: "Design graphique, typographie, recherche-création",
    lede: "Programme poétique, systèmes typographiques, design graphique et code.",
    primaryLabel: "Principaux",
    secondaryLabel: "Ailleurs",
    resumeNote: "CV en anglais"
  },
  en: {
    title: "Rémi Forte",
    description: "Poetic program, typographic systems, graphic design, and code.",
    eyebrow: "Graphic design, typography, research-creation",
    lede: "Poetic program, typographic systems, graphic design, and code.",
    primaryLabel: "Primary",
    secondaryLabel: "Elsewhere",
    resumeNote: "Resume in English"
  }
} satisfies Record<
  Locale,
  {
    title: string;
    description: string;
    eyebrow: string;
    lede: string;
    primaryLabel: string;
    secondaryLabel: string;
    resumeNote: string;
  }
>;

export const resumeContent = {
  title: "Rémi Forte — Resume",
  description: "Professional resume for Rémi Forte.",
  eyebrow: "Resume",
  heading: "Rémi Forte",
  intro:
    "Selected professional experience, teaching, lectures, publications, workshops, exhibitions, press, and awards.",
  backHome: "Back to home"
} as const;

export function getLanguageLabel(locale: Locale): string {
  return locale === "fr" ? "Français" : "English";
}
