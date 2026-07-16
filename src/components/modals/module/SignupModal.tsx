import { Modal } from "@/components/common";

interface Props{
    id:string
    title:string
}

const SignupModal = ({
    id,
    title
}:Props) => {
  return (
    <Modal id={id}>
      <div>SignupModal</div>
    </Modal>
  )
}

export default SignupModal
