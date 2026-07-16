export const dropdownAnimation = {
  initial: {
    opacity: 0,
    y: 8,
    scale: 0.98,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
  exit: {
    opacity: 0,
    y: 8,
    scale: 0.98,
  },
  transition: {
    duration: 0.18,
  },
};

export const sidebarExpend = {
  initial: {
    height: 0,
    opacity: 0,
  },
  animate: {
    height: "auto",
    opacity: 1,
  },
  exit: {
    height: 0,
    opacity: 0,
  },
  transition: {
    duration: 0.2,
  },
};

export const sidebarLabel = {
  initial: {
    opacity: 0,
    x: -8,
  },
  animate: {
    opacity: 1,
    x: 0,
  },
  exit: {
    opacity: 0,
    x: -8,
  },
  transition: {
    duration: 0.15,
  },
};



