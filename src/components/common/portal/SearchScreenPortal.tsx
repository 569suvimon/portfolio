"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { SearchScreen } from "@/components/feature";

export function SearchScreenPortal() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(<SearchScreen />, document.body);
}