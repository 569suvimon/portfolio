"use client";

import { ReactNode } from "react";
import { create } from "zustand";

interface SearchScreenStore {
  isOpen: boolean;
  el: ReactNode | null;

  open: (el: ReactNode) => void;
  close: () => void;
}

export const useSearchScreenStore = create<SearchScreenStore>((set) => ({
  isOpen: false,
  el: null,

  open: (el) =>
    set({
      isOpen: true,
      el,
    }),

  close: () =>
    set({
      isOpen: false,
      el: null,
    }),
}));