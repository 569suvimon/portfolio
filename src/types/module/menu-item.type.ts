import { iconMap } from "@/utils/iconMap";
import { Role } from "@/types";

export type IconName = keyof typeof iconMap;

export interface MenuItem {
  type?: "item" | "divider" | "profile";

  label?: string;
  value: string;

  href?: string;
  icon?: IconName;
  defaultExpanded?: boolean;
  requiredPermissions?: string[];
  children?: MenuItem[];

  // profile
  avatar?: string;
  email?: string;

  roles?: Role[];
}
