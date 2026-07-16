import { MenuItem, SidebarDecisionEngine } from "@/types";


function matchRoute(
  href: string | undefined,
  pathname: string,
): boolean {
  if (!href) {
    return false;
  }

  return (
    pathname === href ||
    pathname.startsWith(`${href}/`)
  );
}

function hasActiveChild(
  item: MenuItem,
  pathname: string,
): boolean {
  if (!item.children?.length) {
    return false;
  }

  return item.children.some((child) => {
    return (
      matchRoute(child.href, pathname) ||
      hasActiveChild(child, pathname)
    );
  });
}

export const activeEngine: SidebarDecisionEngine = (
  decision,
  context,
) => {
  const pathname = context.pathname;

  return {
    ...decision,

    activeKey: "",

    items: decision.items.map((item) => {
      const active = matchRoute(item.item.href, pathname);

      return {
        ...item,

        active,

        parentActive: hasActiveChild(item.item, pathname),
      };
    }),
  };
};
