import type { NavItem } from "../types";

export const bottomBarTabs: NavItem[] = [
  { label: "Home", href: "/", icon: "ph-bold ph-house" },
  { label: "Events", href: "/events", icon: "ph-bold ph-calendar-dots" },
  { label: "Campaigns", href: "/campaigns", icon: "ph-bold ph-rocket-launch" },
  { label: "Makers", href: "/makers", icon: "ph-bold ph-users-three" },
];

export const megaMenuItems: NavItem[] = [
  { label: "Requests", href: "/requests", icon: "ph-bold ph-megaphone" },
  {
    label: "Discord",
    href: "https://discord.gg/DUSUtguG2H",
    icon: "fa-brands fa-discord",
    isExternal: true,
  },
  {
    label: "Hardware Devroom",
    href: "/hardware-devroom",
    icon: "ph-bold ph-monitor",
  },
  { label: "Contact", href: "/contact", icon: "ph-bold ph-envelope" },
];

// ---------------------------------------------------------------------------
// Context navigation — section-specific bottom bar configs
// ---------------------------------------------------------------------------

export interface ContextNavConfig {
  backHref: string;
  backLabel: string;
  items: { label: string; value: string; icon: string }[];
}

export const campaignsContextNav: ContextNavConfig = {
  backHref: "/",
  backLabel: "Home",
  items: [
    { label: "All", value: "all", icon: "ph-bold ph-squares-four" },
    { label: "Live", value: "live", icon: "ph-bold ph-lightning" },
    { label: "Funded", value: "funded", icon: "ph-bold ph-seal-check" },
  ],
};

export const requestsContextNav: ContextNavConfig = {
  backHref: "/",
  backLabel: "Home",
  items: [
    { label: "Hot", value: "hot", icon: "ph-bold ph-fire" },
    { label: "New", value: "new", icon: "ph-bold ph-clock" },
    { label: "Claimed", value: "claimed", icon: "ph-bold ph-hand-grabbing" },
  ],
};

export const makersContextNav: ContextNavConfig = {
  backHref: "/",
  backLabel: "Home",
  items: [
    { label: "All", value: "all", icon: "ph-bold ph-users-three" },
    { label: "Electronics", value: "electronics", icon: "ph-bold ph-circuit-board" },
    { label: "Mechanical", value: "mechanical", icon: "ph-bold ph-gear" },
  ],
};

export const eventsContextNav: ContextNavConfig = {
  backHref: "/",
  backLabel: "Home",
  items: [
    { label: "All", value: "all", icon: "ph-bold ph-calendar-dots" },
    { label: "Workshops", value: "workshop", icon: "ph-bold ph-wrench" },
    { label: "Meetups", value: "meetup", icon: "ph-bold ph-users-three" },
  ],
};
