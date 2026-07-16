"use client";
import { SidebarItem } from "@/components/feature";
import { CurtainLeft, CurtainRight } from "@/components/icons";
import { useSidebarDecision } from "@/hooks/module/useSidebarDecision";
import { useSidebar } from "@/hooks/stores/useSidebar";

interface Props {
  siteName?: string;
}

export default function Sidebar({ siteName }: Props) {
  const sidebar = useSidebarDecision();

  const { toggleSidebar } = useSidebar();

  // console.log(sidebar.items); 
  // console.table(
  //   sidebar.items.map((item) => ({
  //     key: item.key,
  //     parentKey: item.parentKey,
  //     level: item.level,
  //     visible: item.visible,
  //     expanded: item.expanded,
  //     active: item.active,
  //   })),
  // );

  return (
    <aside
      className={`
        flex h-screen flex-col
        border-r bg-white
        transition-[width]
        duration-300
        ${sidebar.mode === "collapsed" ? "w-20" : "w-[260px]"}
      `}
    >
      {siteName && (
        <header className="border-b px-5 py-4">
          {sidebar.mode !== "collapsed" && (
            <h1 className="truncate text-lg font-bold">{siteName}</h1>
          )}
        </header>
      )}

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-1">
          {sidebar.items
            .filter((item) => !item.parentKey)
            .map((item) => (
              <SidebarItem
                key={item.key}
                decision={item}
                items={sidebar.items}
              />
            ))}
        </ul>
      </nav>

      {sidebar.layout.showFooter && (
        <footer className="border-t p-3 text-right">
          <button onClick={toggleSidebar}>
            {sidebar.mode === "collapsed" ? <CurtainRight /> : <CurtainLeft />}
          </button>
        </footer>
      )}
    </aside>
  );
}
