import React from 'react';
import { cn } from '@/utils/clsx';

interface Props {
    icn: React.ReactNode;
    className?: string;
}

const PreFixIcons = ({ icn, className }: Props) => {
    return (
        <div className={cn(`bg-primary-backgroundX h-12 w-12 flex items-center justify-center`, className)}>
           {icn}
        </div>
    )
}

export default PreFixIcons