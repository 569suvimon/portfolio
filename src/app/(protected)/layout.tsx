"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { SidebarVercel, SidebarHorizontal } from "@/components/layout";
import { useAuthStore } from "@/stores/auth.store";
import { useProfile } from "@/hooks/stores/useProfile";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const { data:user, isLoading } = useProfile();
  const { isAuthenticated } = useAuthStore();
  const hasHydrated = useAuthStore((s) => s.hasHydrated);

  useEffect(() => {
    if (!hasHydrated) return;

    if (!isAuthenticated || !user) {
      router.replace("/");
    }
  }, [hasHydrated, isAuthenticated, user, router]);

  // ป้องกันการ render หน้าระหว่าง redirect
  if (!isAuthenticated || !user) {
    return null;
  }

  if (!hasHydrated) {
    return null; // หรือ Loading Screen
  }

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <SidebarVercel siteName="CMS" />

      <div className="flex flex-1 flex-col w-full">
        <SidebarHorizontal />

        <main className="w-full overflow-y-auto bg-zinc-50 p-8 ">
          {/* <div className="grid h-screen grid-cols-[260px_1fr]">
          </div> */}

          {children}
        </main>
      </div>
    </div>
  );
}
