import Link, { type LinkProps } from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/utils/clsx";
import { Button } from "@/components/common";
import { ButtonProps} from "@/types";

interface Props extends ButtonProps{
    children: React.ReactNode;
    className?: string;
    href?: string;
    variant?: ButtonProps["variant"];
}

const LinkButton = ({ href, className, children, variant, ...props }: Props) => {
    const MotionLink = motion.create(Link);
    return (
        <MotionLink
            href={`${href ?? "#"}`}
            whileTap={{ scale: 0.95 }}
            className="group w-full h-full"
        >
            <Button
                {...props}
                variant={`${variant ?? "primary"}`}
                size="lg"
                className={cn('w-full', className)}
            >
                {children}
            </Button>
        </MotionLink>

    )
}

export default LinkButton