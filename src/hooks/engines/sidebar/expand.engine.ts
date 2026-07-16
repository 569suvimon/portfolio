import { SidebarDecisionEngine } from "@/types";

export const expandEngine: SidebarDecisionEngine = (
  decision,
  context,
) => {

  return {

    ...decision,

    items: decision.items.map((item) => {

      const expanded =
        context.expandedItems[item.key]
        ??
        item.item.defaultExpanded
        ??
        false;

      return {

        ...item,

        expanded,

      };

    }),

  };

};