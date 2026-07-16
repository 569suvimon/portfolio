import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/clsx";

export const CardVariants = cva("w-full bg-white", {
  variants: {
    variant: {
      primary: "bg-[#0BA5EC] text-white hover:bg-[#026AA2] ",
      ghost: " ",
    },
  },
  defaultVariants: {
    variant: "ghost",
  },
});

export const ContainerCardVariants = cva(
  "bg-white rounded-md border border-gray-200 transition duration-200 ease-in-out w-full p-8",
  {
    variants: {
      shape: {
        default: "rounded-md",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      shape: "default",
    },
  }
);

export interface InputCompProps
  extends React.ComponentPropsWithoutRef<"input">,
    VariantProps<typeof CardVariants>,
    VariantProps<typeof ContainerCardVariants> {
  children?: React.ReactNode;
  asChild?: boolean;
  className?: string;
  title?: string;
  avatar?: React.ReactNode;
  preFix?: React.ReactNode;
  suffix?: React.ReactNode;
}

const Card = React.forwardRef<HTMLDivElement, InputCompProps>(
  (
    {
      className,
      variant,
      shape,
      title,
      avatar,
      preFix,
      suffix,
      asChild = false,
      children,
      ...props
    },
    ref
  ) => {
    //   const Comp = "div";
    return (
      <div
        ref={ref}
        className={cn(ContainerCardVariants({ shape, className }))}
        {...props}
      >
        {title && <h1 className="mb-8 font-bold text-2xl">{`${title}`}</h1>}
        <div className="flex-1 w-full h-full">{children}</div>
        {suffix && <div className="">{suffix}</div>}
      </div>
    );
  }
);
Card.displayName = "Card";
export default Card;
