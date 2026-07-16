"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

import { MenuItem } from "@/types";
import { useSidebar } from "@/hooks/stores/useSidebar";
import { iconMap } from "@/utils/iconMap";
import { IcnArrowRight } from "@/components/icons";
import { SidebarTooltip, SidebarFlyout } from "@/components/feature";

interface Props {
  item: MenuItem;
  depth?: number;
}

export default function SidebarMenuItem({ item, depth = 0 }: Props) {
  const { collapsed } = useSidebar();
  const pathname = usePathname();

  const hasChildren = !!item.children?.length;

  const defaultOpen =
    hasChildren &&
    item.children!.some((child) => pathname.startsWith(child.href ?? ""));

  const [open, setOpen] = useState(defaultOpen);

  const Icon = item.icon ? iconMap[item.icon] : undefined;

  const isActive = item.href === pathname;

  return (
    <li className="list-none">
      {/* ไม่มีเมนูย่อย */}

      {!hasChildren && (
        <Link
          href={item.href ?? "#"}
          className={`
            flex items-center gap-3 rounded-xl px-4 py-3 transition
            ${isActive ? "bg-blue-600 text-white" : "hover:bg-zinc-100"}
          `}
          style={{
            paddingLeft: `${depth * 16 + 16}px`,
          }}
        >
          <div
            className={`flex w-full items-center ${
              collapsed ? "justify-center" : "gap-3"
            }`}
          >
            {Icon ? (
              <Icon className="h-5 w-5 shrink-0" />
            ) : collapsed ? (
              <SidebarTooltip label={item?.label}>
                <span className="text-sm font-semibold">...</span>
              </SidebarTooltip>
            ) : null}

            <AnimatePresence initial={false}>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.15 }}
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </Link>
      )}

      {/* มีเมนูย่อย */}

     
     {hasChildren && (
  <>
    {collapsed ? (
      <SidebarFlyout item={item}>
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 hover:bg-zinc-100"
          style={{
            paddingLeft: `${depth * 16 + 16}px`,
          }}
        >
          <div className="flex w-full items-center justify-center">
            {Icon ? (
              <Icon className="h-5 w-5 shrink-0" />
            ) : (
              <span className="text-sm font-semibold">...</span>
            )}
          </div>
        </button>
      </SidebarFlyout>
    ) : (
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-3 rounded-xl px-4 py-3 hover:bg-zinc-100"
        style={{
          paddingLeft: `${depth * 16 + 16}px`,
        }}
      >
        <div className="flex w-full items-center gap-3">
          {Icon && <Icon className="h-5 w-5 shrink-0" />}

          <motion.span
            className="flex-1 text-left"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
          >
            {item.label}
          </motion.span>

          <motion.div
            animate={{
              rotate: open ? 90 : 0,
            }}
            transition={{
              duration: 0.2,
            }}
          >
            <IcnArrowRight className="h-4 w-4" />
          </motion.div>
        </div>
      </button>
    )}

    <AnimatePresence initial={false}>
      {!collapsed && open && (
        <motion.ul
          initial={{
            height: 0,
            opacity: 0,
          }}
          animate={{
            height: "auto",
            opacity: 1,
          }}
          exit={{
            height: 0,
            opacity: 0,
          }}
          transition={{
            duration: 0.2,
          }}
          className="overflow-hidden"
        >
          {item.children!.map((child) => (
            <SidebarMenuItem
              key={child.value}
              item={child}
              depth={depth + 1}
            />
          ))}
        </motion.ul>
      )}
    </AnimatePresence>
  </>
)}
    </li>
  );
}
