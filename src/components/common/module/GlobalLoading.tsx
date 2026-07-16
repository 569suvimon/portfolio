// components/common/GlobalLoading.tsx

"use client";

import { useUIStore } from "@/stores/";

export default function GlobalLoading() {
  // const { loading, loadingText } = useUIStore();

  // if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="rounded-xl bg-white px-8 py-6 shadow-lg">
        <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-500" />

        <p className="text-center text-sm">
          {/* {loadingText ?? "Loading..."} */}
        </p>
      </div>
    </div>
  );
}