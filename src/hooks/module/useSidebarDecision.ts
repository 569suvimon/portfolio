"use client";
import { useEffect } from "react";
import {
  visibilityEngine,
  permissionEngine,
  activeEngine,
  expandEngine,
  responsiveEngine,
} from "@/hooks/engines";
import { DASHBOARD_ITEMS } from "@/utils/data";
import { useUIStore } from "@/stores/ui.store";
import { usePathname } from "next/navigation";
import { createSidebarDecision } from "@/hooks/module/createSidebarDecision";
import { usePermissions } from "@/hooks/stores/usePermissions";
import { useBreakpoint } from "@/hooks/module/useBreakpoint";

export function useSidebarDecision() {
  const pathname = usePathname();

  const collapsed = useUIStore((s) => s.sidebarCollapsed);

  const expandedItems = useUIStore((s) => s.expandedItems);

  const setExpandedItems = useUIStore((s) => s.setExpandedItems);

  const permission = usePermissions();

  const breakpoint = useBreakpoint();

  const menu = DASHBOARD_ITEMS;

  /**
   * Initialize default expanded
   */
  useEffect(() => {
    const defaults = Object.fromEntries(
      menu
        .filter((item) => item.defaultExpanded)
        .map((item) => [item.value, true]),
    );

    if (
      Object.keys(expandedItems).length === 0 &&
      Object.keys(defaults).length
    ) {
      setExpandedItems(defaults);
    }
  }, [menu, expandedItems, setExpandedItems]);


  const context = {
    pathname,

    collapsed,

    expandedItems,

    permission,

    breakpoint,

    menu,
  };

  let decision = createSidebarDecision(menu);

  decision = permissionEngine(decision, context);

  decision = activeEngine(decision, context);

  decision = expandEngine(decision, context);

  decision = visibilityEngine(decision, context);

  decision = responsiveEngine(decision, context);

  return decision;
}
