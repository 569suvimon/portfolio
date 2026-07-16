import { cva } from "class-variance-authority";

export const InputVariants = cva(` `, {
  variants: {
    variant: {
      primary:
        "bg-[#0BA5EC] text-white hover:bg-[#026AA2] active:bg-[#0086C9] disabled:bg-[#B9E6FE]",
      ghost: "bg-transparent",
    },
    shape: {
      default: "rounded-md",
      none: "rounded-none",
      full: "rounded-full",
    },
    container: {
      default:
        "bg-white transition duration-200 ease-in-out w-full h-12  px-2 ring-slate-100 border border-gray-200 hover:border-gray-300 disabled:border-transparent disabled:bg-gray-100 hover:disabled:border-transparent [&:has(:focus-visible)]:ring-2 ",
      base: "bg-white transition duration-200 ease-in-out w-full h-10  px-2 ring-slate-100 border border-gray-200 hover:border-gray-300 disabled:border-transparent disabled:bg-gray-100 hover:disabled:border-transparent [&:has(:focus-visible)]:ring-2",
      ghost:
        "bg-transparent transition duration-200 ease-in-out w-full h-12  px-2  ",
    },
  },
  defaultVariants: {
    variant: "ghost",
  },
});

export const InputSearchVariants = cva("outline-none w-full h-12 px-5", {
  variants: {
    variant: {
      primary:
        "bg-[#0BA5EC] text-white hover:bg-[#026AA2] active:bg-[#0086C9] disabled:bg-[#B9E6FE]",
      ghost: "hover:bg-accent hover:text-accent-foreground",
    },
    shape: {
      default: "rounded-full",
      round: "rounded-3xl",
      circle: "px-1 rounded-3xl",
    },
  },
  defaultVariants: {
    variant: "ghost",
    shape: "default",
  },
});

export const ContainerInputVariants = cva(
  "bg-white transition duration-200 ease-in-out w-full h-12  px-2 ring-slate-100 border border-gray-200 hover:border-gray-300 disabled:border-transparent disabled:bg-gray-100 hover:disabled:border-transparent  flex items-center justify-between [&:has(:focus-visible)]:ring-2 overflow-hidden",
  {
    variants: {
      shape: {
        default: "rounded-md",
        none: "rounded-none",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      shape: "default",
    },
  },
);
