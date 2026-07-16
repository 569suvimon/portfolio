"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { scrollLock } from "@/utils/scroll";
import { useSearchScreenStore } from "@/stores/search-screen.store";

export default function SearchScreen() {
  const { isOpen, el, close } = useSearchScreenStore();

  useEffect(() => {
    if (isOpen) {
      scrollLock.enable();
    } else {
      scrollLock.disable();
    }

    return () => scrollLock.disable();
  }, [isOpen]);

  return (
    <div
      className={
        isOpen
          ? "fixed inset-0 z-[9999999] overflow-hidden"
          : "pointer-events-none"
      }
    >
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={close}
              className="absolute inset-0 bg-black/50"
            />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="search-backdrop"
            >
              <div className="search-screen-content">
                {el}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}