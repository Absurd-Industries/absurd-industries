import type { NavItem } from "../types";

export const bottomBarTabs: NavItem[] = [
  { label: "Home", href: "/", icon: "ph-bold ph-house" },
  { label: "Events", href: "/events", icon: "ph-bold ph-calendar-dots" },
  { label: "Campaigns", href: "/campaigns", icon: "ph-bold ph-rocket-launch" },
  { label: "Makers", href: "/makers", icon: "ph-bold ph-users-three" },
];

export const megaMenuItems: NavItem[] = [
  { label: "Requests", href: "/requests", icon: "ph-bold ph-hand-palm" },
  {
    label: "Discord",
    href: "https://discord.gg/DUSUtguG2H",
    icon: "ph-bold ph-discord-logo",
    isExternal: true,
  },
  {
    label: "Hardware Devroom",
    href: "/hardware-devroom",
    icon: "ph-bold ph-monitor",
  },
  { label: "FAQ", href: "/faq", icon: "ph-bold ph-question" },
  { label: "Contact", href: "/contact", icon: "ph-bold ph-envelope" },
];
