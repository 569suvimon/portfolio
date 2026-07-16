"use client";

import { useState } from "react";
import { iconMap } from "@/utils/iconMap";
import { MenuItem } from "@/types";

interface Props {
  item: MenuItem;
  onSelect?: (item: MenuItem) => void;
}

export default function DropdownMenuItem({
  item,
  onSelect,
}: Props) {
  const [open, setOpen] = useState(false);
  const Icon = item.icon ? iconMap[item.icon] : undefined;
  const hasChildren = !!item.children?.length;

  return (
    <li
      className="relative list-none"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className="flex w-full items-center justify-between gap-3 px-4 py-2 text-left hover:bg-zinc-100 transition-colors"
        onClick={() => {
          if (hasChildren) {
            setOpen((prev) => !prev);
          } else {
            onSelect?.(item);;
          }
        }}
      >
        <span className="flex items-center gap-2">
          {Icon && <Icon className="h-4 w-4" />}
          {item.label}
        </span>

        {hasChildren && (
          <span className="text-xs">▶</span>
        )}
      </button>

      {hasChildren && open && (
        <ul className="absolute left-full top-0 min-w-55 rounded-lg border bg-white shadow-lg">
          {item.children!.map((child) => (
            <DropdownMenuItem
              key={child.value}
              item={child}
              onSelect={onSelect}
            />
          ))}
        </ul>
      )}
    </li>
  );
}