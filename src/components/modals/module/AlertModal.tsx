"use client";
import { AlertModalProps, AlertFooterProps } from "@/types";
import { IcnTired, CheckCircle, InfoCircle } from "@/components/icons";
import { Button } from "@/components/common";
import { Modal } from "@/components/common";
import { useModalStore } from "@/stores/modal.store";


const modalConfig = {
  error: {
    title: "Error",
    color: "text-red-500",
    icon: IcnTired,

    renderFooter: ({ closeModal }: AlertFooterProps) => (
      <Button className="w-full" onClick={closeModal}>
        OK
      </Button>
    ),
  },

  success: {
    title: "Success",
    color: "text-green-500",
    icon: CheckCircle,

    renderFooter: ({ closeModal }: AlertFooterProps) => (
      <Button className="w-full" onClick={closeModal}>
        OK
      </Button>
    ),
  },

  confirm: {
    title: "Warning",
    color: "text-yellow-500",
    icon: InfoCircle,

    renderFooter: ({
      closeModal,
      onConfirm,
      currentLoading,
    }: AlertFooterProps) => (
      <div className="flex gap-2">
        <Button variant="primary" onClick={closeModal}>
          Cancel
        </Button>

        <Button loading={currentLoading} onClick={onConfirm}>
          OK
        </Button>
      </div>
    ),
  },
};

export default function AlertModal({ id, ...props }: AlertModalProps) {
  const config = modalConfig[props.type];
  const closeById = useModalStore((s) => s.closeModalById);
  const closeModal = () => closeById(id);
  const Icon = config.icon;

  return (
    <Modal id={id}>
      <div className=" flex flex-col items-center gap-3">
        <Icon className={`w-32 h-32 ${config.color}`} />

        <h2 className={config.color}>{config.title}</h2>

        <p className="my-3">{props.text}</p>

        {config.renderFooter({
          closeModal,
          onConfirm: props.onConfirm,
          currentLoading: props.currentLoading,
        })}
      </div>
    </Modal>
  );
}
