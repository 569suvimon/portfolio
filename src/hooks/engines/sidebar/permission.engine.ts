import { SidebarDecisionEngine } from "@/types";

export const permissionEngine: SidebarDecisionEngine = (decision, context) => {
  const userPermissions = context.permission.permissions;

  return {
    ...decision,

    items: decision.items.map((item) => {
      const requiredPermissions = item.item.requiredPermissions;

      const allow =
        !requiredPermissions ||
        requiredPermissions.length === 0 ||
        requiredPermissions.some((permission) =>
          userPermissions.includes(permission),
        );


      return {
        ...item,

        permissionAllowed: allow,

        disabled: false,
      };
    }),
  };
};
