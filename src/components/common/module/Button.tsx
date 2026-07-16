import * as React from "react";
import { ButtonProps } from "@/types";
import { cn } from "@/utils/clsx";
import { iconMap } from "@/utils/iconMap";
import { baseStyles, variants, sizes, iconOnlySizes } from "@/variants";

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = "primary",
      size = "md",
      loading = false,
      prefixIcon,
      suffixIcon,
      shape = "circle",
      disabled,
      ...props
    },
    ref,
  ) => {
    // const Comp = asChild ? Slot : "button"
    const isIconOnly = !children && (prefixIcon || suffixIcon);

    let prefix = null;

    if (typeof prefixIcon === "string") {
      const Icon = iconMap[prefixIcon];
      prefix = Icon ? <Icon /> : null;
    } else {
      prefix = prefixIcon;
    }

    let suffix = null;

    if (typeof suffixIcon === "string") {
      const Icon = iconMap[suffixIcon];
      suffix = Icon ? <Icon /> : null;
    } else {
      suffix = suffixIcon;
    }

    return (
      <button
        className={cn(
          baseStyles,
          variants[variant],
          isIconOnly
            ? isIconOnly
              ? iconOnlySizes[size]
              : iconOnlySizes.default
            : sizes[size],
          loading && "opacity-70 cursor-not-allowed",
          disabled ? "cursor-not-allowed" : "cursor-pointer",
          shape === "square" ? "rounded-[8px]" : "rounded-full",
          className,
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {prefix && !loading && (
          <span className={children ? "mr-2" : ""}>{prefix}</span>
        )}
        {children}
        {suffix && <span className={children ? "ml-2" : ""}>{suffix}</span>}
      </button>
    );
  },
);

export default Button;
