export type ModalType =
  | "LoginModal"
  | "SignupModal"
  | "alert"
  | "ForgotPasswordModal";

export interface ModalItem<T = any> {
  id: string;
  type: ModalType;
  props?: T;
  isOpen: boolean;
}

export interface ModalStore {
  modals: ModalItem[];

  openModal: <T = any>(type: ModalType, props?: T) => void;

  closeModal: () => void;

  closeModalById: (id: string) => void;

  removeModal: (id: string) => void;

  closeAllModal: () => void;
}


export type AlertVariant =
  | "success"
  | "error"
  // | "warning"
  // | "info"
  | "confirm";

export interface AlertModalProps {
  id: string;
  type: AlertVariant;
  text?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  currentLoading?: boolean;
  closeModal: () => void;
}

export interface AlertFooterProps {
  closeModal: () => void;
  onConfirm?: () => void;
  currentLoading?: boolean;
}