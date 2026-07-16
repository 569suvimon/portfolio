import React from 'react'
import { cn } from '@/utils/clsx';
import { InputVariants } from '@/variants';
import { InputCompProps } from "@/types"


const Input = React.forwardRef<HTMLInputElement, InputCompProps>(
  (
    {
      className,
      variant,
      shape,
      container,
      preFix,
      suffix,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = "input";
    return (
      <div
        className={cn(
          `flex items-center justify-between overflow-hidden `,
          InputVariants({
            container: `${container ? container : "default"}`,
            shape: `${shape ? shape : "default"}`,
          })
        )}
      >
        {preFix && <div className="">{preFix}</div>}
        <div className={cn(`flex-1 w-full h-full `, className)}>
          <Comp
            ref={ref}
            {...props}
            className={cn(
              `w-full h-full outline-none `,
              InputVariants({ variant })
            )}
          />
        </div>
        {suffix && <div className="">{suffix}</div>}
      </div>
    );
  }
);
Input.displayName = "Input";

export default Input;
