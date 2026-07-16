"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRouter } from "next/navigation";

import { SearchSheet } from "@/components/feature";
import { Button } from "@/components/common";
import { IcnSearch } from "@/components/icons";
import { useSearchScreenStore } from "@/stores/search-screen.store";

const HeaderMobile = () => {
  const router = useRouter();

  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [50, 100], [0, 1]);
  const { open } = useSearchScreenStore();

  return (
    <header className="sticky top-0 z-50 w-full h-12 ">
      <motion.div style={{ opacity }} className="absolute inset-0 shadow-md" />
      <div className="flex items-center w-full h-full px-4 min-w-0">
        <nav className="flex flex-1 items-center min-w-0 bg-blue-500">
          {/* <OverflowDropdown
            items={HOME_ITEMS}
            onSelect={(item) => {
              if (item.href) router.push(item.href);
            }}
          /> */}
        </nav>
        <div className="shrink-0">
          <h1 className=" text-xl font-bold whitespace-nowrapX">
            {"235WEB.COM"}
          </h1>
        </div>
        {/* NAV */}
        {/* RIGHT */}
        <div className="flex-1 text-right">
          <Button
            variant={"ghost"}
            onClick={() => open(<SearchSheet />)}
            className="relative cursor-pointer"
          >
            <IcnSearch className="w-4 h-4 " />
          </Button>
          
          search
        </div>
      </div>
    </header>
  );
};

export default HeaderMobile;
