"use client";

import { HeaderSkeleton } from "@/components/skeleton";
import { HeaderDesktop, HeaderMobile } from "@/components/layout";
import { useBreakpoint } from "@/hooks/module/useBreakpoint";

export default function Header() {
  const { mounted, compact } = useBreakpoint();

  if (!mounted) {
    return <HeaderSkeleton />;
  }

  return compact ? <HeaderMobile /> : <HeaderDesktop />;
}