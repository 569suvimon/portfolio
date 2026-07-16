"use client";

import { FC, useEffect, useMemo, useState, useRef } from "react";
import { Input } from "@/components/common";
import { IcnSearch, IconDellFill } from "@/components/icons";
import { useSearchScreenStore } from "@/stores/search-screen.store";
import { useRouter } from "next/navigation";


const SearchSheet = () => {
  // const searchScreen = useSearchScreen();
  const router = useRouter();
    const { close } = useSearchScreenStore();
  

  // const [resultData, setResultData] = useState<SearchItem[]>([]);
  const [searchValue, setSearchValue] = useState("");
  // const [loading, setLoading] = useState(false);

  const isNavigatingRef = useRef(false);

  const handleNavigate = (slug: string) => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;

    // 1) close sheet (trigger animation)
    close();

    // 2) wait next frame so close animation starts
    requestAnimationFrame(() => {
      // 3) wait animation duration (match your CSS / framer motion)
      setTimeout(() => {
        router.push(`/posts/${slug}`);
      }, 250);
    });
  };

  return (
    <div className="relative bg-white/90">
      {/* SEARCH INPUT */}
      <div className="w-full flexed top-0 left-0 search-form bg-black/12 py-0 md:py-3">
        <div className="w-full md:max-w-3/4 mx-auto">
          <Input
            shape="none"
            container="ghost"
            placeholder="What are you looking for?"
            preFix={<IcnSearch className="w-6 h-6" />}
            suffix={<IconDellFill className="w-6 h-6 cursor-pointer" onClick={close} />}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="p-1 px-2 w-full text-gray-800"
          />
        </div>
      </div>

      {/* RESULTS */}
      <div className="w-screen h-screen overflow-y-auto">
        <div className="my-4 px-3 w-full md:max-w-3/4 mx-auto">
          Your search keyword: {searchValue}
        </div>

        <div className="w-full px-3 md:max-w-3/4 mx-auto mt-3">
          {/* {loading ? (
            <Loading className="flex justify-center" />
          ) : resultData.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {resultData.map((item) => (
                <PostPreview
                  key={item.slug}
                  post={item as any}
                  handleClick={() => handleNavigate(item.slug)}
                />
              ))}
            </div>
          ) : (
            <p>Not found !</p>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default SearchSheet;