"use client"

import { useEffect, useState } from "react";

export function useBreakpoint() {
  const [width, setWidth] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const update = () => {
      setWidth(window.innerWidth);
    };

    update();
    setMounted(true);

    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("resize", update);
    };
  }, []);

  return {
    mounted,
    width,
    mobile: width < 640,
    tablet: width >= 640 && width < 1024,
    desktop: width >= 1024,
    compact: width < 720,
  };
}