import type { NavItem } from "../types";

export const bottomBarTabs: NavItem[] = [
  { label: "Campaigns", href: "/campaigns", icon: "ph-bold ph-rocket-launch" },
  { label: "Makers", href: "/makers", icon: "ph-bold ph-users-three" },
  { label: "Requests", href: "/requests", icon: "ph-bold ph-megaphone" },
  { label: "Events", href: "/events", icon: "ph-bold ph-calendar-dots" },
];

export const megaMenuItems: NavItem[] = [
  { label: "Inventory", href: "/inventory", icon: "ph-bold ph-package" },
  {
    label: "Discord",
    href: "https://discord.gg/DUSUtguG2H",
    icon: "fa-brands fa-discord",
    isExternal: true,
  },
  {
    label: "Hardware Devroom",
    href: "/hardware-devroom",
    icon: "ph-bold ph-microchip",
  },
  { label: "Contact", href: "/contact", icon: "ph-bold ph-envelope" },
];
