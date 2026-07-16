"use client";

import React from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { MotionConfig, motion } from "framer-motion";
import { Portal } from "@/components/common";
import { useModalStore } from "@/stores/modal.store";
import { cn } from "@/utils/clsx";

interface ModalProps {
  id: string;
  children: React.ReactNode;
  className?:string;
}

const backdropVariants = {
  closed: {
    opacity: 0,
  },
  open: {
    opacity: 1,
  },
};

const panelVariants = {
  closed: {
    y: "var(--y-closed, 0)",
    opacity: "var(--opacity-closed)",
    scale: "var(--scale-closed, 1)",
  },
  open: {
    y: "var(--y-open, 0)",
    opacity: "var(--opacity-open)",
    scale: "var(--scale-open, 1)",
  },
};

export const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  ({ id, children, className }, ref) => {
    const modal = useModalStore((s) => s.modals.find((m) => m.id === id));

    const closeById = useModalStore((s) => s.closeModalById);
    const remove = useModalStore((s) => s.removeModal);

    if (!modal) return null;

    return (
      <Portal>
        <MotionConfig
          transition={{
            type: "spring",
            bounce: 0.25,
            duration: 0.35,
          }}
        >
          <Dialog
            static
            open={true}
            onClose={() => closeById(id)}
            className="relative z-50"
          >
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-gray-900/75"
              initial="closed"
              animate={modal.isOpen ? "open" : "closed"}
              variants={backdropVariants}
            />

            {/* Content */}
            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <DialogPanel
                  as={motion.div}
                  ref={ref}
                  initial="closed"
                  animate={modal.isOpen ? "open" : "closed"}
                  variants={panelVariants}
                  className={cn(`
                    relative overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl sm:my-8 w-full sm:w-full sm:max-w-lg sm:p-6
                    max-sm:[--y-closed:16px] [--opacity-closed:0%] sm:[--scale-closed:90%]
                    max-sm:[--y-open:0px] [--opacity-open:100%] sm:[--scale-open:100%]
                  `, className)}
                  onAnimationComplete={(definition) => {
                    if (definition === "closed" && !modal.isOpen) {
                      remove(id);
                    }
                  }}
                >
                  {children}
                </DialogPanel>
              </div>
            </div>
          </Dialog>
        </MotionConfig>
      </Portal>
    );
  },
);

Modal.displayName = "Modal";
