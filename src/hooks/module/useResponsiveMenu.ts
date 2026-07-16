"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { MenuItem } from "@/types";

interface Options {
  items: MenuItem[];
  moreWidth?: number;
}

export function useResponsiveMenu({
  items,
  moreWidth = 80,
}: Options) {
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLUListElement>(null);

  const [visibleItems, setVisibleItems] = useState<MenuItem[]>(items);
  const [overflowItems, setOverflowItems] = useState<MenuItem[]>([]);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const measure = measureRef.current;

    if (!container || !measure) return;

    const calculate = () => {
      const containerWidth = container.offsetWidth;

      const nodes = Array.from(measure.children) as HTMLElement[];

      let used = 0;

      const visible: MenuItem[] = [];
      const overflow: MenuItem[] = [];

      for (let i = 0; i < nodes.length; i++) {
        const width = nodes[i].offsetWidth;

        if (used + width + moreWidth <= containerWidth) {
          used += width;
          visible.push(items[i]);
        } else {
          overflow.push(items[i]);
        }
      }

      setVisibleItems(visible);
      setOverflowItems(overflow);
    };

    calculate();

    const observer = new ResizeObserver(calculate);
    observer.observe(container);

    window.addEventListener("resize", calculate);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", calculate);
    };
  }, [items, moreWidth]);

  return {
    containerRef,
    measureRef,
    visibleItems,
    overflowItems,
  };
}