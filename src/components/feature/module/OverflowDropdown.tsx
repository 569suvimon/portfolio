"use client";

import { useEffect, useRef, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

import { MenuItem } from "@/types";
import OverflowDropdownItem from "./OverflowDropdownItem";
import { dropdownAnimation } from "@/utils/framer_motion";

interface Props {
  items: MenuItem[];
  placeholder?: string;
  onSelect?: (item: MenuItem) => void;
}

export default function OverflowDropdown({
  items,
  placeholder = "More",
  onSelect,
}: Props) {
  const [open, setOpen] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  // Click outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClick);

    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // ESC
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("keydown", handleKey);

    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div ref={wrapperRef} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="
          flex
          items-center
          gap-2
          rounded-lg
          border
          bg-white
          px-4
          py-2
          text-sm
          transition
          hover:bg-zinc-100
        "
      >
        {placeholder}

        <motion.span
          animate={{
            rotate: open ? 180 : 0,
          }}
          transition={{
            duration: 0.2,
          }}
        >
          ▼
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            {...dropdownAnimation}
            className="
              absolute
              right-0
              top-full
              z-50
              mt-2

              w-max
              min-w-55
              max-w-[320px]

              rounded-xl
              border
              bg-white
              overflow-hidden
              shadow-xl
            "
          >
            <ul className="py-1">
              {items.map((item) => (
                <OverflowDropdownItem
                  key={item.value}
                  item={item}
                  onSelect={(menu) => {
                    onSelect?.(menu);
                    setOpen(false);
                  }}
                />
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
