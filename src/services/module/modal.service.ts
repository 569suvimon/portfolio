import { useModalStore } from "@/stores/modal.store";

export const ModalService = {
  error(text: string) {
    useModalStore.getState().openModal("alert", {
      type: "error",
      text,
    });
  },

  success(text: string) {
    useModalStore.getState().openModal("alert", {
      type: "success",
      text,
    });
  },

  confirm(props: {
    text: string;
    onConfirm: () => void;
  }) {
    useModalStore.getState().openModal("alert", {
      type: "confirm",
      ...props,
    });
  },
};