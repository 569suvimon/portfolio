import { Modal } from "@/components/common";

interface Props{
    id:string
    title:string
}
const ForgotPasswordModal = ({
    id,
    title
}:Props) => {
  return (
    <Modal id={id}>
      <div>ForgotPasswordModal</div>
    </Modal>
  );
};

export default ForgotPasswordModal;
