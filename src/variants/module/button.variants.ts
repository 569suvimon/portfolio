// 'use client'
// import { cva } from "class-variance-authority";

export type ButtonVariant =
  | "primary"
  | "default"
  | "outline"
  | "ghost"
  | "secondary"
  | "tertiary"
  | "primary_outline"
  | "secondary-outline"
  | "tertiary-outline"
  | "export-outline"
  | "quaternary"
  | "quaternary-outline";

export const baseStyles =
  "inline-flex items-center justify-center font-medium transition-colors duration-200";

export const variants = {
  default: "bg-primary text-primary-foreground hover:bg-primary/90",
  outline:
    "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
  ghost: "hover:bg-accent hover:text-accent-foreground",
  primary:
    "bg-[#265ED6] text-white hover:bg-[#142B41] active:bg-[#265ED6] disabled:bg-[#D9D9D9]",
  secondary:
    "bg-[#1CB579] text-white hover:bg-[#037146] active:bg-[#1CB579] disabled:bg-[#E6F3E6]",
  tertiary:
    "bg-[#FF3B3B] text-white hover:bg-[#950000] active:bg-[#FF3B3B] disabled:bg-[#FFC3C3]",
  primary_outline:
    "bg-white border-[1px] border-[#265ED6] text-[#265ED6] hover:bg-[#142B41] hover:text-white hover:border-[#142B41] active:bg-[#265ED6] disabled:bg-[#E7E7E9] disabled:text-white disabled:border-none",
  "secondary-outline":
    "bg-white border-[1px] border-[#1CB579] text-[#1CB579] hover:bg-[#037146] hover:text-white hover:border-[#037146] active:bg-[#1CB579] disabled:bg-[#E6F3E6]",
  "tertiary-outline":
    "bg-white border-[1px] border-[#FF3B3B] text-[#FF3B3B] hover:bg-[#FF3B3B] hover:text-white hover:border-[#FF3B3B] active:bg-[#FF3B3B] disabled:bg-[#E7E7E9] disabled:text-white disabled:border-[#E7E7E9]",
  "export-outline":
    "bg-white border-[1px] border-[#D9D9D9] bg-white hover:bg-[#97BEE4] active:bg-[#97BEE4] disabled:bg-[#FFC3C3]",
  quaternary:
    "bg-[#E3F1FF] text-[#265ED6] hover:bg-[#142B41] hover:text-white active:bg-[#E3F1FF] active:text-[#265ED6] disabled:bg-[#D9D9D9] disabled:text-white",
  "quaternary-outline":
    "bg-transparent text-[#265ED6] hover:bg-[#142B41] hover:text-white hover:border-[#142B41] active:bg-[#265ED6] disabled:bg-[#D9D9D9] disabled:text-white",
};

export const sizes = {
  default: "h-10 px-4 py-2",
  sm: "h-9 rounded-md px-3",
  md: "h-8  px-8",
  lg: "h-11 rounded-md px-8",
};

export const iconOnlySizes = {
  lg: "h-12 w-12 text-base",
  md: "h-10 w-10 text-base",
  sm: "h-8 w-8 text-sm",
  default: "h-6 w-6 text-sm",
};

export const shape = {
  default: "rounded",
  round: "rounded-3xl",
  circle: "px-1 rounded-3xl",
};

export const defaultVariants = {
  variant: "default",
  size: "default",
  shape: "default",
};

