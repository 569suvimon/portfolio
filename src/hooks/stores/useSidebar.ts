import { useUIStore } from "@/stores/ui.store"


export const useSidebar = () => {
  const sidebarCollapsed = useUIStore((s) => s.sidebarCollapsed);
  const toggleSidebar = useUIStore((s) => s.toggleSidebar);

  const setExpandedItems = useUIStore((s) => s.setExpandedItems);
  const expandedItems = useUIStore((s) => s.expandedItems);
  const toggleExpanded = useUIStore((s) => s.toggleExpanded);
  

  return {
    setExpandedItems: setExpandedItems,
    expandedItems: expandedItems,
    collapsed: sidebarCollapsed,
    toggleSidebar: toggleSidebar,
    toggleExpanded:toggleExpanded,
  };
};