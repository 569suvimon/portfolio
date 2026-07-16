"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRouter } from "next/navigation";
import { MenuItem } from "@/types";

import {
  Dropdown,
  HeaderMenuItem,
  OverflowDropdown,
  SearchSheet,
} from "@/components/feature";
import { Button } from "@/components/common";
import { HOME_ITEMS, USER_ITEMS } from "@/utils/data";
import { IcnSearch } from "@/components/icons";
import { useSearchScreenStore } from "@/stores/search-screen.store";
import { useModalStore } from "@/stores/modal.store";
import { useAuthStore } from "@/stores/auth.store";
import { useProfile } from "@/hooks/stores/useProfile";
import { useResponsiveMenu } from "@/hooks/module/useResponsiveMenu";

const HeaderDesktop = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const logout = useAuthStore((s) => s.logout);
  const { data: user } = useProfile();
  
  const router = useRouter();

  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [50, 100], [0, 1]);
  const { open: openSearch } = useSearchScreenStore();
  const openModal = useModalStore((s) => s.openModal);

  const { containerRef, measureRef, visibleItems, overflowItems } =
    useResponsiveMenu({
      items: HOME_ITEMS,
    });

  const handleLogout = async () => {
    // showLoading();

    await logout();

    await new Promise((resolve) => setTimeout(resolve, 400));

    router.replace("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full h-12 bg-red-100 font-serifX ">
      <motion.div style={{ opacity }} className="absolute inset-0 shadow-md" />

      <div className="flex items-center w-full h-full px-4 min-w-0">
        <h1 className="mr-8 text-xl font-bold whitespace-nowrap">
          {"235WEB.COM"}
        </h1>
        {/* NAV */}
        <nav ref={containerRef} className="flex flex-1 items-center min-w-0">
          <ul className="flex flex-1 items-center gap-4 overflow-hidden whitespace-nowrap font-serifX font-sansX">
            {visibleItems.map((item) => (
              <HeaderMenuItem key={item.value} item={item} />
            ))}
          </ul>

          <div className="ml-2 shrink-0">
            {overflowItems.length > 0 && (
              <OverflowDropdown
                items={overflowItems}
                onSelect={(item) => {
                  if (item.href) router.push(item.href);
                }}
              />
            )}
          </div>
        </nav>
        {/* RIGHT */}
        <div className="shrink-0 ml-4 flex items-center justify-center gap-2 ">
          <div className="">
            <Button
              // variant={"primary"}
              onClick={() => openSearch(<SearchSheet />)}
              className="relative cursor-pointer p-0 m-0 bg-translate hover:bg-translate active:bg-translate text-bg-primary"
            >
              <IcnSearch className="w-4 h-4 " />
            </Button>
          </div>
          <div className="w-[1px] h-5 bg-primary "/>
          <div className="">
            {isAuthenticated ? (
              <Dropdown
                placeholder={"Manage"}
                arrow={true}
                items={USER_ITEMS.map((item) =>
                  item.type === "profile"
                    ? {
                        ...item,
                        email: `${user?.name}`,
                      }
                    : item,
                )}
                onSelect={(selected: MenuItem) => {
                  selected.value === "logout" && handleLogout();
                  selected?.href && router.replace(selected.href);
                }}
              />
            ) : (
              <Button
                onClick={() =>
                  openModal("LoginModal", {
                    title: "Login Form",
                  })
                }
                variant={"primary"}
                className="relative cursor-pointer"
              >
                Sing-in
              </Button>
            )}
          </div>
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
};

export default HeaderDesktop;
