"use client";

import Link from "next/link";
import { forwardRef, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { MenuItem } from "@/types";
import { iconMap } from "@/utils/iconMap";

interface Props {
  item: MenuItem;
  depth?: number;
}

const HeaderMenuItem = forwardRef<HTMLLIElement, Props>(
  ({ item, depth = 0 }, ref) => {
    const [open, setOpen] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const hasChildren =
      Array.isArray(item.children) && item.children.length > 0;

    const Icon = item.icon ? iconMap[item.icon] : null;

    // ✅ hover stable (no flicker)
    const handleEnter = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      setOpen(true);
    };

    const handleLeave = () => {
      timerRef.current = setTimeout(() => {
        setOpen(false);
      }, 120);
    };

    return (
      <li
        ref={ref}
        className="relative list-none shrink-0"
        data-value={item.value}
      >
        {/* WRAPPER */}
        <div onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
          
          {/* MAIN ITEM */}
          <div className="flex items-center gap-2 px-3 py-2 whitespace-nowrap hover:text-blue-600 transition">
            
            <Link
              href={item.href ?? "#"}
              className="inline-flex items-center gap-2"
            >
              {Icon && <Icon className="h-4 w-4" />}
              <span className="text-sm">{item.label}</span>
            </Link>

            {hasChildren && (
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="text-xs px-1 text-zinc-500"
              >
                ▼
              </button>
            )}
          </div>

          {/* DROPDOWN */}
          <AnimatePresence>
            {hasChildren && open && (
              <motion.ul
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.15 }}
                className="
                  absolute left-0 top-full z-50 mt-2
                  min-w-50
                  rounded-xl border bg-white shadow-lg
                  py-1
                  overflow-hidden
                "
              >
                {item.children!.map((child) => (
                  <li key={child.value}>
                    <Link
                      href={child.href ?? "#"}
                      className="
                        block px-4 py-2 text-sm
                        hover:bg-zinc-100 transition
                      "
                    >
                      {child.label}
                    </Link>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </li>
    );
  }
);

HeaderMenuItem.displayName = "HeaderMenuItem";

export default HeaderMenuItem;