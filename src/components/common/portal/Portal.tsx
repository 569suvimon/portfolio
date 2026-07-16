"use client";
import React, { useEffect } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  children: React.ReactNode;
}

// export const Portal = React.forwardRef<HTMLDivElement, PortalProps>(
//   ({ children, ...props }, ref) => {
//     const [mounted, setMounted] = React.useState(false);
//     useEffect(() => setMounted(true), []);
//     return mounted ? createPortal(children, document.body) : null;
//   }
// );

export const Portal = React.forwardRef<HTMLDivElement, PortalProps>(
  ({ children, ...props }, ref) => {
    const [mounted, setMounted] = React.useState(false);

    useEffect(() => {
      setMounted(true);
    }, []);

    if (!mounted) return null;

    return createPortal(
      <div ref={ref} {...props}>
        {children}
      </div>,
      document.body
    );
  }
);

Portal.displayName = "Portal";