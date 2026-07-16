"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRouter } from "next/navigation";

import {
  HeaderMenuItem,
  OverflowDropdown,
  SearchSheet,
} from "@/components/feature";
import { Button } from "@/components/common";
import { HOME_ITEMS } from "@/utils/data";
import { MenuItem } from "@/types";
import { IcnSearch } from "@/components/icons";
import { useSearchScreenStore } from "@/stores/search-screen.store";

interface Props {
  title: string;
}

export default function HeaderMeasure({ title }: Props) {
  const router = useRouter();

  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [50, 100], [0, 1]);

  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLUListElement>(null);

  const [visible, setVisible] = useState<MenuItem[]>(HOME_ITEMS);
  const [overflow, setOverflow] = useState<MenuItem[]>([]);

  const { open } = useSearchScreenStore();

  /**
   * CORE ENGINE (Vercel style)
   */
  useLayoutEffect(() => {
    const container = containerRef.current;
    const measure = measureRef.current;

    if (!container || !measure) return;

    const calculate = () => {
      const containerWidth = container.offsetWidth;

      const items = Array.from(measure.children) as HTMLElement[];

      let used = 0;
      const visibleItems: MenuItem[] = [];
      const overflowItems: MenuItem[] = [];

      for (let i = 0; i < items.length; i++) {
        const w = items[i].offsetWidth;

        // reserve space for "More" button (important)
        const reserve = 80;

        if (used + w + reserve <= containerWidth) {
          used += w;
          visibleItems.push(HOME_ITEMS[i]);
        } else {
          overflowItems.push(HOME_ITEMS[i]);
        }
      }

      setVisible(visibleItems);
      setOverflow(overflowItems);
    };

    calculate();

    const ro = new ResizeObserver(calculate);
    ro.observe(container);

    window.addEventListener("resize", calculate);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", calculate);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full h-12 bg-red-100">
      <motion.div style={{ opacity }} className="absolute inset-0 shadow-md" />

      <div className="flex items-center w-full h-full px-4 min-w-0">
        <h1 className="mr-8 text-xl font-bold whitespace-nowrap">
          {"235WEB.COM"}
        </h1>
        {/* NAV */}
        <nav ref={containerRef} className="flex flex-1 items-center min-w-0">
          <ul className="flex flex-1 items-center gap-4 overflow-hidden whitespace-nowrap">
            {visible.map((item) => (
              <HeaderMenuItem key={item.value} item={item} />
            ))}
          </ul>

          <div className="ml-2 shrink-0">
            {overflow.length > 0 && (
              <OverflowDropdown
                items={overflow}
                onSelect={(item) => {
                  if (item.href) router.push(item.href);
                }}
              />
            )}
          </div>
        </nav>
        {/* RIGHT */}
        <div className="shrink-0 ml-4">
          <Button
            variant={"ghost"}
            onClick={() => open(<SearchSheet />)}
            className="relative cursor-pointer"
          >
            <IcnSearch className="w-4 h-4 " />
          </Button>
          search
        </div>

        {/* HIDDEN MEASUREMENT LAYER (IMPORTANT) */}
        <ul
          ref={measureRef}
          className="absolute invisible left-0 top-0 flex gap-4 whitespace-nowrap"
        >
          {HOME_ITEMS.map((item) => (
            <li key={item.value} className="px-4 py-2">
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}

