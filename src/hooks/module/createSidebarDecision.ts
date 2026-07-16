"use client";
import {
  MenuItem,
  SidebarDecision,
  SidebarItemDecision,
} from "@/types";

function createItems(
  items: MenuItem[],
  parentKey?: string,
  level = 0,
): SidebarItemDecision[] {

  return items.flatMap((item) => {

    const key = parentKey
      ? `${parentKey}.${item.value}`
      : item.value;

    const current: SidebarItemDecision = {

      key,

      parentKey,

      item,

      active: false,

      expanded: !!item.defaultExpanded,

      /**
       * Engine จะเป็นคนตัดสินใหม่
       * ตอนเริ่มต้นให้แสดงเฉพาะ Root
       */
      visible: level === 0,

      permissionAllowed: true,

      disabled: false,

      hasChildren:
        !!item.children?.length,

      showChevron:
        !!item.children?.length,

      showTooltip: false,

      level,

      parentActive: false,

    };

    return [

      current,

      ...(item.children
        ? createItems(
            item.children,
            key,
            level + 1,
          )
        : []),

    ];

  });

}

export function createSidebarDecision(
  menu: MenuItem[],
): SidebarDecision {

  return {

    mode: "expanded",

    activeKey: "",

    layout: {

      width: 260,

      showLogo: true,

      showFooter: true,

    },

    items: createItems(menu),

  };

}