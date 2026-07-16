import {
  SidebarDecisionEngine,
} from "@/types";

export const collapseEngine: SidebarDecisionEngine = (
  decision,
  context,
) => {

  return {

    ...decision,

    mode:
      context.collapsed
        ? "collapsed"
        : "expanded",

  };

};