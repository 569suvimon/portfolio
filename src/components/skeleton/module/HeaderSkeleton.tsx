import React from "react";

const HeaderSkeleton = () => {
  return (
    <>
      <div className="sticky top-0 z-50 w-full h-12 bg-white animate-pulse">
        <div className="flex items-center w-full h-full px-4 min-w-0">
          <div className="h-6 w-1/12 bg-gray-200" />
          {/* NAV */}
          <div className="flex-1 px-8">
            <ul className="flex items-center gap-4 overflow-hidden whitespace-nowrap">
                <li className="h-4 w-[80px] bg-gray-200"/>
                <li className="h-4 w-[80px] bg-gray-200"/>
                <li className="h-4 w-[80px] bg-gray-200"/>
            </ul>
          </div>
          {/* RIGHT */}
          <div className="shrink-0 ml-4">
            <div className="h-6 w-6 bg-gray-200 rounded-full" />
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderSkeleton;
