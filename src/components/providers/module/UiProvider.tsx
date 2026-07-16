"use client";

import { SearchScreenPortal, GlobalLoading } from "@/components/common";
import { ModalProvider } from "@/components/providers";

interface Props {
  children: React.ReactNode;
}

export function UiProvider({ children }: Props) {
  return (
    <>
      {children}

      <SearchScreenPortal />
      <ModalProvider/>
      {/* <GlobalLoading /> */}
    </>
  );
}