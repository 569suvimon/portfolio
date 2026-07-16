import { MenuItem } from "@/types";

export type SidebarRenderMode = "link" | "accordion" | "flyout";


export interface SidebarItemDecision {

  key: string;

  parentKey?: string;

  item: MenuItem;

  active: boolean;

  expanded: boolean;

  permissionAllowed: boolean;

  visible: boolean;

  disabled: boolean;

  hasChildren: boolean;

  showChevron: boolean;

  showTooltip: boolean;

  level: number;

  parentActive: boolean;

}

export interface SidebarDecision {
  mode: "expanded" | "collapsed" | "floating";

  items: SidebarItemDecision[];
  activeKey: string;
  layout: {
    width: number;
    showLogo: boolean;
    showFooter: boolean;
  };
}

//engines

export interface SidebarDecisionEngine {
  (decision: SidebarDecision, context: SidebarDecisionContext): SidebarDecision;
}

export interface SidebarDecisionContext {
  menu: MenuItem[];

  pathname: string;

  permission: {
    permissions: string[];
  }

  breakpoint: BreakpointState;

  collapsed: boolean;

  expandedItems: Record<string, boolean>;
}

export interface BreakpointState {
  mounted: boolean;
  width: number;
  mobile: boolean;
  tablet: boolean;
  desktop: boolean;
  compact: boolean;
}

export interface SidebarState {
  collapsed: boolean;
  expandedItems: Record<string, boolean>;
}

export interface SidebarDecision {
  mode: SidebarMode;

  activeKey: string;

  layout: SidebarLayout;

  items: SidebarItemDecision[];
}

export type Role = "admin" | "editor" | "viewer";

// export type Viewport = "mobile" | "tablet" | "desktop";
interface Viewport {
  width: number;
  height: number;
}
export type SidebarMode = "expanded" | "collapsed" | "floating";

export interface SidebarLayout {
  width: number;
  showLogo: boolean;
  showFooter: boolean;
}
