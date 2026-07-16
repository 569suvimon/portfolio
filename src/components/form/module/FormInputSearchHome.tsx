import React from 'react'
import { FormInputSearchProps } from '@/types';
import { cn } from '@/utils/clsx';
import { InputSearchVariants } from '@/variants';


const FormInputSearchHome = React.forwardRef<HTMLInputElement, FormInputSearchProps>(
    ({ className, variant, shape, asChild = false, ...props }, ref) => {
      const Comp = "input";
      return (
        <Comp
          className={cn(InputSearchVariants({ variant, shape, className }))}
          ref={ref}
          {...props}
        />
      )
    }
  )
  FormInputSearchHome.displayName = "FormInputSearchHome"

export default FormInputSearchHome;
