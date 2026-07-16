import { SidebarDecisionEngine } from "@/types";

export const visibilityEngine: SidebarDecisionEngine = (
  decision,
) => {

  const visibleMap = new Map<string, boolean>();

  for (const item of decision.items) {

    const parent =
      decision.items.find(
        x => x.key === item.parentKey
      );

    // root
    if (!parent) {
      visibleMap.set(
        item.key,
        item.permissionAllowed,
      );

      continue;
    }


    const parentVisible =
      visibleMap.get(parent.key) ?? false;


    visibleMap.set(
      item.key,
      item.permissionAllowed &&
      parentVisible,
    );
  }


  return {
    ...decision,

    items: decision.items.map(item => ({
      ...item,

      visible:
        visibleMap.get(item.key) ?? false,
    })),
  };
};


// export const visibilityEngine: SidebarDecisionEngine = (
//   decision,
// ) => {

//   const visibleMap = new Map<string, boolean>();

//   for (const item of decision.items) {

//     // Root
//     if (item.level === 0) {

//       visibleMap.set(item.key, true);

//       continue;
//     }

//     const parent = decision.items.find(
//       x => x.key === item.parentKey
//     );

//     if (!parent) {

//       visibleMap.set(item.key, false);

//       continue;

//     }

//     const parentVisible =
//       visibleMap.get(parent.key) ?? false;

//     visibleMap.set(
//       item.key,
//       parentVisible &&
//       parent.expanded,
//     );

//   }

//   return {

//     ...decision,

//     items: decision.items.map(item => ({

//       ...item,

//       visible:
//         visibleMap.get(item.key) ?? false,

//     })),

//   };

// };