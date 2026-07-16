import { type VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes } from "react";

import { 
    ButtonVariant, 
    ContainerInputVariants, 
    InputSearchVariants, 
    InputVariants 
} from '@/variants';

import { IconName } from "@/utils/iconMap";

export interface InputCompProps 
    extends React.ComponentPropsWithoutRef<"input">,
    VariantProps<typeof InputVariants>,
    VariantProps<typeof ContainerInputVariants> {
    // children?: React.ReactNode;
    asChild?: boolean;
    className?: string;
    preFix?: React.ReactNode;
    suffix?: React.ReactNode;
};


export interface FormInputSearchProps extends React.ComponentPropsWithoutRef<"input">,VariantProps<typeof InputSearchVariants> {
    children?: React.ReactNode;
    asChild?: boolean;
    className?: string;
}


// export interface ButtonProps
//   extends React.ButtonHTMLAttributes<HTMLButtonElement>,
//     VariantProps<typeof buttonVariants> {
//   asChild?: boolean
// }

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: "lg" | "md" | "sm";
  loading?: boolean;
   prefixIcon?: IconName | React.ReactElement;
  suffixIcon?: IconName | React.ReactElement;
  shape?: "circle" | "square";
}
