"use client";

import { useRef, useState } from "react";
import DropdownMenuItem from "./DropdownMenuItem";
import { MenuItem } from "@/types";
import { Button } from "@/components/common";
import { IcnExpandDown } from "@/components/icons";
import { motion, AnimatePresence } from "framer-motion";
import { dropdownAnimation } from "@/utils/framer_motion";
import { useClickOutside } from "@/hooks/module/useClickOutside";
import { useEscapeKey } from "@/hooks/module/useEscapeKey";

interface Props {
  placeholder: string;
  items: MenuItem[];
  onSelect?: (item: MenuItem) => void;
  arrow?: boolean;
}

export default function Dropdown({
  placeholder,
  items,
  onSelect,
  arrow = false,
}: Props) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useClickOutside(wrapperRef, () => setOpen(false));
  useEscapeKey(() => setOpen(false));

  return (
    <div ref={wrapperRef} className="relative">
      <Button
        onClick={() => setOpen((v) => !v)}
        className="rounded-md border pl-4 pr-2 py-2 flex items-center gap-1"
      >
        {placeholder}

        {arrow && (
          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            transition={{
              duration: 0.25,
              ease: "easeInOut",
            }}
          >
            <IcnExpandDown className="w-6 h-6" />
          </motion.div>
        )}
      </Button>

      <AnimatePresence>
        {open && (
          <motion.ul
            {...dropdownAnimation}
            className="absolute right-0 mt-2 min-w-55 overflow-hidden rounded-lg border bg-white shadow-lg origin-top"
          >
            {items.map((item) => {
              if (item.type === "divider") {
                return (
                  <li
                    key={item.value}
                    className="border-t border-gray-200 my-1"
                  />
                );
              }

              if (item.type === "profile") {
                return (
                  <li
                    key={item.value}
                    className="flex items-center gap-3 px-4 py-3"
                  >
                    {item.avatar && (
                      <img
                        src={item.avatar}
                        alt={item.label}
                        className="h-10 w-10 rounded-full"
                      />
                    )}

                    <div>
                      <p className="text-xs text-gray-400">{item.label}</p>
                      <p className="text-sm font-medium">{item.email}</p>
                    </div>
                  </li>
                );
              }

              return (
                <DropdownMenuItem
                  key={item.value}
                  item={item}
                  onSelect={(selected) => {
                    onSelect?.(selected);
                    setOpen(false);
                  }}
                />
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}