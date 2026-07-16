import { create } from "zustand";

interface UIStore {
  sidebarCollapsed: boolean;

  mobileSidebarOpen: boolean;

  /**
   * Sidebar expanded state
   * key = SidebarItemDecision.key
   */
  expandedItems: Record<string, boolean>;

  toggleSidebar(): void;

  toggleMobileSidebar(): void;

  toggleExpanded(itemKey: string): void;

  expand(itemKey: string): void;

  collapse(itemKey: string): void;

  /**
   * Initialize default expanded menu
   */
  setExpandedItems(items: Record<string, boolean>): void;

  resetExpanded(): void;
}

export const useUIStore = create<UIStore>((set) => ({
  sidebarCollapsed: false,

  mobileSidebarOpen: false,

  expandedItems: {},

  toggleSidebar: () =>
    set((state) => ({
      sidebarCollapsed: !state.sidebarCollapsed,
    })),

  toggleMobileSidebar: () =>
    set((state) => ({
      mobileSidebarOpen: !state.mobileSidebarOpen,
    })),

  toggleExpanded: (key: string) =>
    set((state) => ({
      expandedItems: {
        ...state.expandedItems,
        [key]: !state.expandedItems[key],
      },
    })),

  expand: (itemKey) =>
    set((state) => ({
      expandedItems: {
        ...state.expandedItems,

        [itemKey]: true,
      },
    })),

  collapse: (itemKey) =>
    set((state) => ({
      expandedItems: {
        ...state.expandedItems,

        [itemKey]: false,
      },
    })),

  setExpandedItems: (items: Record<string, boolean>) =>
    set((state) => ({
      expandedItems: {
        ...items,
        ...state.expandedItems,
      },
    })),

  resetExpanded: () =>
    set({
      expandedItems: {},
    }),
}));
