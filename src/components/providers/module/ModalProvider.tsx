
import { useModalStore } from "@/stores/modal.store";
import { AnimatePresence } from "framer-motion";

import {
  AlertModal,
  ForgotPasswordModal,
  SignupModal,
  LoginModal,
} from "@/components/modals";

const modalMap = {
  LoginModal,
  SignupModal,
  ForgotPasswordModal,
  alert: AlertModal,
};

export default function ModalProvider() {
  const modals = useModalStore((s) => s.modals);

  return (
    <>
      <AnimatePresence mode="sync">
        {modals.map((modal, index) => {
          const Component = modalMap[modal.type];

          return (
            <Component
              key={modal.id}
              id={modal.id}
              index={index}
              {...modal.props}
            />
          );
        })}
      </AnimatePresence>
    </>
  );
}
