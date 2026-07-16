"use client";

import { HeaderMenuItem, Dropdown } from "@/components/feature";
import { MenuItem } from "@/types";
import { USER_ITEMS, HORIZON_ITEMS } from "@/utils/data";
import { useAuthStore } from "@/stores/auth.store";
import { useProfile } from "@/hooks/stores/useProfile";

export default function SidebarHorizontal() {
  const horizonMenus: MenuItem[] = HORIZON_ITEMS;
  const items: MenuItem[] = horizonMenus;
  const logout = useAuthStore((s) => s.logout);
   const { data: user } = useProfile();
  
  return (
    <aside className="w-full border-r bg-white p-3 px-5 flex justify-between">
      <nav className="space-y-2">
        <ul className="flex items-center gap-4 whitespace-nowrap min-w-0">
          {items.map((item) => (
            <HeaderMenuItem key={item.value} item={item} />
          ))}
        </ul>
      </nav>
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
        onSelect={(selected: MenuItem) =>
          selected.value === "logout" && logout()
        }
      />
    </aside>
  );
}
