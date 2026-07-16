import { create } from "zustand";
import { ModalStore } from "@/types";

export const useModalStore = create<ModalStore>((set) => ({
  modals: [],

  openModal: (type, props) =>
    set((state) => ({
      modals: [
        ...state.modals,
        {
          id: crypto.randomUUID(),
          type,
          props,
          isOpen: true,
        },
      ],
    })),

  closeModal: () =>
    set((state) => ({
      modals: state.modals.map((modal, index) =>
        index === state.modals.length - 1
          ? { ...modal, isOpen: false }
          : modal
      ),
    })),

  closeModalById: (id) =>
    set((state) => ({
      modals: state.modals.map((modal) =>
        modal.id === id
          ? { ...modal, isOpen: false }
          : modal
      ),
    })),

  removeModal: (id) =>
    set((state) => ({
      modals: state.modals.filter((m) => m.id !== id),
    })),

  closeAllModal: () =>
    set((state) => ({
      modals: state.modals.map((m) => ({
        ...m,
        isOpen: false,
      })),
    })),
}));