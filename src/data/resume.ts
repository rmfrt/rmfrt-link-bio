import rawResumeData from "./resume.raw.json";
import { escapeHtml, renderInlineMarkdown } from "./markdown";

type RawResumeData = Record<string, RawResumeItem[]>;

type RawResumeItem = {
  what?: unknown;
  where?: unknown;
  when?: unknown;
  description?: unknown;
  visible?: unknown;
};

type RawLocation = {
  location?: unknown;
  city?: unknown;
  country?: unknown;
};

type RawDateRange = {
  start?: unknown;
  end?: unknown;
};

export type ResumeLocation = {
  location: string;
  city?: string;
  country?: string;
};

export type ResumeDateRange = {
  start: string;
  end?: string;
};

export type ResumeItem = {
  what: string;
  where: ResumeLocation;
  when: ResumeDateRange;
  description?: string;
};

export type ResumeSection = {
  title: string;
  items: ResumeItem[];
};

const MONTH_FORMATTER = new Intl.DateTimeFormat("en-US", {
  month: "long",
  timeZone: "UTC",
  year: "numeric"
});

const YEAR_FORMATTER = new Intl.DateTimeFormat("en-US", {
  timeZone: "UTC",
  year: "numeric"
});

export const resumeSections: ResumeSection[] = Object.entries(rawResumeData as RawResumeData)
  .map(([title, items]) => ({
    title,
    items: items.map((item, index) => normalizeItem(title, item, index)).filter(isResumeItem)
  }))
  .filter((section) => section.items.length > 0);

export function formatLocationHtml(where: ResumeLocation): string {
  const detail = [where.city, where.country].filter(Boolean).join(", ");
  const location = renderInlineMarkdown(where.location);

  return detail ? `${location} <span class="resume-location-detail">(${escapeHtml(detail)})</span>` : location;
}

export function formatDateRangeParts(when: ResumeDateRange): {
  start: { label: string; dateTime: string };
  end?: { label: string; dateTime: string };
} {
  const start = formatDate(when.start);
  const end = when.end ? formatDate(when.end) : undefined;

  return { start, end };
}

export function getResumeSectionId(title: string): string {
  return `resume-${title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")}`;
}

export function getDateTime(value: string): string {
  return value === "NOW" ? String(new Date().getFullYear()) : value;
}

function normalizeItem(category: string, item: RawResumeItem, index: number): ResumeItem | null {
  if (item.visible !== true) {
    return null;
  }

  if (typeof item.what !== "string" || item.what.trim() === "") {
    throw new Error(`Invalid resume item title at ${category}[${index}]`);
  }

  if (containsPlaceholderValue(item.what)) {
    throw new Error(`Placeholder value in resume item title at ${category}[${index}]: ${item.what}`);
  }

  const where = normalizeLocation(item.where, category, index);
  const when = normalizeDateRange(item.when, category, index);
  const description = typeof item.description === "string" && item.description.trim() ? item.description : undefined;

  return {
    what: item.what,
    where,
    when,
    description
  };
}

function normalizeLocation(value: unknown, category: string, index: number): ResumeLocation {
  if (typeof value === "string" && value.trim()) {
    return { location: value };
  }

  if (!isRecord(value)) {
    throw new Error(`Invalid resume location at ${category}[${index}]`);
  }

  const rawLocation = value as RawLocation;

  if (typeof rawLocation.location !== "string" || rawLocation.location.trim() === "") {
    throw new Error(`Invalid resume location label at ${category}[${index}]`);
  }

  return {
    location: rawLocation.location,
    city: typeof rawLocation.city === "string" && rawLocation.city.trim() ? rawLocation.city : undefined,
    country: typeof rawLocation.country === "string" && rawLocation.country.trim() ? rawLocation.country : undefined
  };
}

function normalizeDateRange(value: unknown, category: string, index: number): ResumeDateRange {
  if (Array.isArray(value) && typeof value[0] === "string") {
    return { start: value[0] };
  }

  if (!isRecord(value)) {
    throw new Error(`Invalid resume date range at ${category}[${index}]`);
  }

  const rawDateRange = value as RawDateRange;

  if (typeof rawDateRange.start !== "string" || rawDateRange.start.trim() === "") {
    throw new Error(`Invalid resume start date at ${category}[${index}]`);
  }

  return {
    start: rawDateRange.start,
    end: typeof rawDateRange.end === "string" && rawDateRange.end.trim() ? rawDateRange.end : undefined
  };
}

function formatDate(value: string): { label: string; dateTime: string } {
  if (value === "NOW") {
    return { label: "Present", dateTime: getDateTime(value) };
  }

  if (/^\d{4}$/.test(value)) {
    return { label: YEAR_FORMATTER.format(new Date(`${value}-01-01T00:00:00Z`)), dateTime: value };
  }

  if (/^\d{4}-\d{2}$/.test(value)) {
    return { label: MONTH_FORMATTER.format(new Date(`${value}-01T00:00:00Z`)), dateTime: value };
  }

  return { label: value, dateTime: value };
}

function isResumeItem(value: ResumeItem | null): value is ResumeItem {
  return value !== null;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function containsPlaceholderValue(value: string): boolean {
  return /\b(undefined|null|nan)\b/i.test(value);
}
