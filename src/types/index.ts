/**
 * Absurd Industries — Shared TypeScript Types
 *
 * Shaped as future API response interfaces so they can serve as
 * drop-in replacements when the platform moves to a D1 backend.
 */

// ---------------------------------------------------------------------------
// Campaigns
// ---------------------------------------------------------------------------

/** A crowdfunding campaign for an open-source STEAM project. */
export interface Campaign {
  /** URL-safe identifier, e.g. "solar-pi-cluster". */
  slug: string;

  /** Display title shown on cards and the detail page. */
  title: string;

  /** One-liner pitch displayed beneath the title. */
  tagline: string;

  /** Phosphor icon class for the category glyph, e.g. "ph-bold ph-drop". */
  icon: string;

  /** Human-readable maker / creator name. */
  makerName: string;

  /** Slug of the maker profile, used to build the maker link. */
  makerSlug: string;

  /** Free-text location string, e.g. "Bengaluru, India". */
  location: string;

  /** Hex colour for the avatar circle, e.g. "#FF5900". */
  avatarColor: string;

  /** Campaign category label, e.g. "Hardware", "Biology". */
  category: string;

  /** Current lifecycle status of the campaign. */
  status: "live" | "funded" | "coming";

  /** Funding progress as an integer percentage (0-100+). */
  percent: number;

  /** Funding goal in INR (paise-free integer). */
  goalINR: number;

  /** Formatted goal string with currency symbol, e.g. "₹2,50,000". */
  goalFormatted: string;

  /** Formatted amount raised so far, e.g. "₹1,87,500". */
  raisedFormatted: string;

  /** Total number of unique backers. */
  backers: number;

  /** Days remaining in the campaign; omitted for funded/coming campaigns. */
  daysLeft?: number;

  /** SPDX-style license identifier, e.g. "CERN-OHL-S-2.0". */
  license: string;

  /** Slug of the community request this campaign was born from, if any. */
  bornFromRequest?: string;

  /** Path or URL to the campaign cover image. */
  image?: string;
}

// ---------------------------------------------------------------------------
// Makers
// ---------------------------------------------------------------------------

/** A maker / creator profile on the platform. */
export interface Maker {
  /** URL-safe identifier, e.g. "priya-patel". */
  slug: string;

  /** Display name. */
  name: string;

  /** Professional title or one-liner, e.g. "Embedded Systems Hacker". */
  title: string;

  /** Free-text location string. */
  location: string;

  /** Hex colour for the avatar circle. */
  avatarColor: string;

  /** List of skill/tag labels, e.g. ["PCB Design", "Rust", "KiCad"]. */
  skills: string[];

  /** Number of projects (campaigns) the maker has launched. */
  projects: number;

  /** Cumulative backer count across all campaigns. */
  backers: number;

  /** Short specialty descriptor shown on cards, e.g. "Hardware". */
  specialty: string;

  /** Longer biography for the detail page. */
  bio?: string;

  /** Optional external profile links. */
  links?: {
    github?: string;
    website?: string;
    twitter?: string;
  };
}

// ---------------------------------------------------------------------------
// Events
// ---------------------------------------------------------------------------

/** A community event — meetup, workshop, hackathon, talk, or conference. */
export interface AbsurdEvent {
  /** URL-safe identifier, e.g. "soldering-101-blr". */
  slug: string;

  /** Display title of the event. */
  title: string;

  /** ISO-8601 date string, e.g. "2026-07-12". */
  date: string;

  /** Human-readable time string, e.g. "2:00 PM - 5:00 PM IST". */
  time: string;

  /** Full address or short location, e.g. "Bengaluru, India". */
  location: string;

  /** Venue name, e.g. "Workbench Projects". */
  venue: string;

  /** City name for filtering, e.g. "Bengaluru". */
  city: string;

  /** Event format / category. */
  category: "meetup" | "workshop" | "hackathon" | "talk" | "conference";

  /** Multi-line event description (may contain markdown). */
  description: string;

  /** Name of the event host or organiser. */
  hostName: string;

  /** Path or URL to the host's avatar image. */
  hostAvatar?: string;

  /** Current number of registered attendees. */
  attendees: number;

  /** Capacity cap; omitted when unlimited. */
  maxAttendees?: number;

  /** Ticket price in INR; 0 means the event is free. */
  priceINR: number;

  /** Descriptive tags, e.g. ["soldering", "beginner", "hardware"]. */
  tags: string[];

  /** Path or URL to a cover/banner image. */
  image?: string;

  /** External registration link (e.g. Luma, Eventbrite). */
  registrationUrl?: string;
}

// ---------------------------------------------------------------------------
// Requests
// ---------------------------------------------------------------------------

/** A community request for a product or project that doesn't exist yet. */
export interface Request {
  /** URL-safe identifier, e.g. "affordable-reflow-oven". */
  slug: string;

  /** Short request title. */
  title: string;

  /** Longer explanation of what is being requested and why. */
  description: string;

  /** Category label, e.g. "Hardware", "Software". */
  category: string;

  /** Current workflow status of the request. */
  status: "open" | "claimed" | "in-progress" | "fulfilled";

  /** Community upvote count. */
  upvotes: number;

  /** Number of discussion comments on the request. */
  commentCount: number;

  /** Display name of the person who submitted the request. */
  authorName: string;

  /** Slug of the author's maker profile. */
  authorSlug: string;

  /** ISO-8601 datetime when the request was created. */
  createdAt: string;

  /** Descriptive tags for filtering, e.g. ["pcb", "beginner"]. */
  tags: string[];

  /** Maker slug of whoever claimed this request. */
  claimedBy?: string;

  /** Slug of the campaign that fulfilled this request. */
  campaignSlug?: string;
}

// ---------------------------------------------------------------------------
// Friends / Partners
// ---------------------------------------------------------------------------

/** An Absurd Industries partner or friend organisation. */
export interface Friend {
  /** Organisation or partner name. */
  name: string;

  /** External URL to the partner's site. */
  url: string;

  /** Logo image path relative to /images/partners/. */
  logo: string;

  /** Optional one-liner about the partner. */
  description?: string;
}

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------

/** A single item in the bottom-bar or mega-menu navigation. */
export interface NavItem {
  /** Visible link text, e.g. "Campaigns". */
  label: string;

  /** Destination path or URL. */
  href: string;

  /** Phosphor icon class, e.g. "ph-bold ph-rocket-launch". */
  icon: string;

  /** When true the link opens in a new tab (external site). */
  isExternal?: boolean;
}
