"use client";
import { usePathname } from "next/navigation";

import { DASHBOARD_ITEMS } from "@/utils/data";
import { useSidebar } from "@/hooks/stores/useSidebar";
import { SidebarDecisionContext } from "@/types";
import { usePermissions } from "@/hooks/stores/usePermissions";
import { useBreakpoint } from "@/hooks/module/useBreakpoint";

export function useSidebarDecisionContext(): SidebarDecisionContext {
  const pathname = usePathname();

  const { collapsed, expandedItems } = useSidebar();

  const { permissions } = usePermissions();

  const breakpoint = useBreakpoint();

  //console.log("context", collapsed);

  return {
    menu: DASHBOARD_ITEMS,
    pathname,

    permission: {
      permissions,
    },

    breakpoint,

    collapsed,
    expandedItems,
  };
}
