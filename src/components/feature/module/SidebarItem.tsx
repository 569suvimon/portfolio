import { SidebarItemDecision } from "@/types";
import { useSidebar } from "@/hooks/stores/useSidebar";

import Link from "next/link";

import { motion, AnimatePresence } from "framer-motion";
import { sidebarLabel, sidebarExpend } from "@/utils/framer_motion";
import { iconMap } from "@/utils/iconMap";
import { IcnArrowRight } from "@/components/icons";
import { SidebarTooltip, SidebarFlyout } from "@/components/feature";

interface Props {
  decision: SidebarItemDecision;
  items: SidebarItemDecision[];
}

export default function SidebarItem({ decision, items }: Props) {
  const { toggleExpanded, collapsed } = useSidebar();

  if (!decision.visible) {
    return null;
  }

  const Icon = decision.item.icon ? iconMap[decision.item.icon] : null;

  const children = items.filter(
    (item) => item.parentKey === decision.key && item.visible,
  );

  const hasChildren = children.length > 0;

  return (
    <li className="list-none">
      {/* ======================
          MENU ITEM
      ======================= */}

      {!hasChildren ? (
        // ======================
        // NORMAL LINK
        // ======================
        <Link
          href={decision.item.href ?? "#"}
          className={`
            flex items-center gap-3
            rounded-xl px-4 py-3
            transition

            ${decision.active ? "bg-blue-600 text-white" : "hover:bg-zinc-100"}
          `}
          style={{
            paddingLeft: `${decision.level * 16 + 16}px`,
          }}
        >
          {collapsed ? (
            <SidebarTooltip label={decision.item.label}>
              {Icon && (
                <Icon
                  className="
                        h-5 w-5
                        shrink-0
                      "
                />
              )}
            </SidebarTooltip>
          ) : (
            <>
              {Icon && (
                <Icon
                  className="
                        h-5 w-5
                        shrink-0
                      "
                />
              )}

              <motion.span {...sidebarLabel}>{decision.item.label}</motion.span>
            </>
          )}
        </Link>
      ) : collapsed ? (
        // ======================
        // COLLAPSED + CHILDREN
        // ======================
        <SidebarFlyout item={decision.item}>
          <button
            type="button"
            className="
              flex w-full
              items-center
              justify-center
              rounded-xl
              px-4 py-3
              hover:bg-zinc-100
            "
          >
            {Icon && (
              <Icon
                className="
                    h-5 w-5
                    shrink-0
                  "
              />
            )}
          </button>
        </SidebarFlyout>
      ) : (
        // ======================
        // EXPANDED + CHILDREN
        // ======================
        <button
          type="button"
          onClick={() => toggleExpanded(decision.key)}
          className={`
            flex w-full
            items-center gap-3
            rounded-xl
            px-4 py-3
            transition

            ${decision.active ? "bg-blue-600 text-white" : "hover:bg-zinc-100"}
          `}
          style={{
            paddingLeft: `${decision.level * 16 + 16}px`,
          }}
        >
          {Icon && (
            <Icon
              className="
                  h-5 w-5
                  shrink-0
                "
            />
          )}

          <motion.span className="flex-1 text-left">
            {decision.item.label}
          </motion.span>

          {decision.showChevron && (
            <motion.div
              animate={{
                rotate: decision.expanded ? 90 : 0,
              }}
              transition={{
                duration: 0.2,
              }}
            >
              <IcnArrowRight className="h-4 w-4" />
            </motion.div>
          )}
        </button>
      )}

      {/* ======================
          CHILDREN
      ======================= */}

      <AnimatePresence initial={false}>
        {!collapsed && decision.expanded && hasChildren && (
          <motion.ul {...sidebarExpend} className="overflow-hidden">
            {children.map((child) => (
              <SidebarItem key={child.key} decision={child} items={items} />
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  );
}
