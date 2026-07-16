import { SidebarDecisionEngine } from "@/types";

const SIDEBAR_WIDTH = {
  expanded: 260,
  collapsed: 80,
  floating: 260,
} as const;

export const responsiveEngine: SidebarDecisionEngine = (
  decision,
  context,
) => {

  const mode =
    context.breakpoint.width < 768
      ? "floating"
      : context.collapsed
        ? "collapsed"
        : "expanded";


  return {

    ...decision,

    mode,


    layout: {

      ...decision.layout,

      width:
        SIDEBAR_WIDTH[mode],

      showLogo:
        mode !== "collapsed",

      showFooter:
        mode !== "floating",

    },


    items: decision.items.map(item => ({

      ...item,

      showTooltip:
        mode === "collapsed",

    })),

  };

};