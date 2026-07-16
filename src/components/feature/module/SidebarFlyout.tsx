"use client";

import Link from "next/link";
import { ReactNode } from "react";

import { MenuItem } from "@/types";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui";

interface Props {
  item: MenuItem | undefined;
  children: ReactNode;
}

export default function SidebarFlyout({
  item,
  children,
}: Props) {

  const hasChildren = !!item?.children?.length;

  return (
    <HoverCard>
      <HoverCardTrigger>
        {children}
      </HoverCardTrigger>

      <HoverCardContent
        side="right"
        align="start"
        sideOffset={8}
        className="w-40 bg-red-100"
      >

        <div>
          {item?.label}
        </div>

        <div />

        {hasChildren ? (
          item?.children!.map((child) => (

            <div
              key={child.value}
              >
              <Link href={child.href ?? "#"}>
                {child.label}
              </Link>
            </div>

          ))
        ) : (

          <div >
            <Link href={item?.href ?? "#"}>
              Open
            </Link>
          </div>

        )}

      </HoverCardContent>

    </HoverCard>
  );
}