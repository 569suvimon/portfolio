import type { MenuItem } from "@/types";

export const HORIZON_ITEMS: MenuItem[] = [
  {
    label: "เว็บไซต์",
    value: "home",
    href: "/",
  },
];

export const USER_ITEMS: MenuItem[] = [
  {
    type: "profile",
    value: "profile-header",
    label: "Name",
    email: "example@mail.com",
    // avatar: "/avatar.png",
  },

  {
    type: "divider",
    value: "divider-1",
  },

  {
    value: "dashboard",
    label: "Dashboard",
    href: "/dashboard",
    icon: "github",
  },
  {
    value: "profile",
    label: "Profile",
    icon: "github",
  },
  {
    value: "games",
    label: "Game Accounts",
    icon: "github",
  },

  {
    type: "divider",
    value: "divider-2",
  },

  {
    value: "logout",
    label: "Logout",
    icon: "github",
  },
];

export const DASHBOARD_ITEMS: MenuItem[] = [
  {
    label: "แดชบอร์ด",
    value: "home",
    href: "/dashboard",
    requiredPermissions: ["dashboard.read"],
    icon: "github",
  },
  {
    label: "ผลงาน",
    value: "portfolio",
    defaultExpanded: true,
    requiredPermissions: ["portfolio.read"],
    icon: "github",
    children: [
      {
        label: "เพิ่มอาร์ตเวริค",
        value: "about",
        href: "/about",
        icon: "github",
        requiredPermissions: ["portfolio.read"],
      },
      {
        label: "รายการทั้งหมด",
        value: "values",
        href: "/values",
        icon: "github",
        requiredPermissions: ["portfolio.read"],
      },
    ],
  },
  {
    label: "ร้านค้า",
    value: "store",
    icon: "github",
    defaultExpanded: false,
    requiredPermissions: ["user.read"],
    children: [
      {
        label: "Contract us",
        value: "about",
        href: "/about",
        icon: "github",
        requiredPermissions: ["user.read"],
      },
      {
        label: "Our values",
        value: "values",
        href: "/values",
        icon: "github",
        requiredPermissions: ["user.read"],
      },
    ],
  },
  {
    label: "Sitting",
    value: "posts",
    href: "/posts",
    icon: "github",
  },
  {
    label: "เกี่ยวกับฉัน",
    value: "about",
    href: "/about",
    icon: "github",
  },
];

export const HOME_ITEMS: MenuItem[] = [
  {
    label: "สำรวจ",
    value: "explore",
    href: "/explore",
  },
  {
    label: "ซื้อ-ขาย",
    value: "marketplace",
    icon: "github",
    href: "/marketplace",
  },
  {
    label: "ผลงาน",
    value: "artwork",
    href: "/artwork",
  },
  //   {
  //     label: "หางาน",
  //     value: "่jobs",
  //     // href: "/่jobs",
  //   },
  //   {
  //     label: "จ้างงาน",
  //     value: "hire",
  //     // href: "/hire",
  //   },
];
