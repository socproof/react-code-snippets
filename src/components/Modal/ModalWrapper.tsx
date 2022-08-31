import {useLockBodyScroll} from "../../api/hooks";
import {useState} from "react";

export const ModalWrapper = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <div>
      <button onClick={() => setModalOpen(true)}>Show modal</button>
      {modalOpen && (
        <Modal title='Modal' content='Content' onClose={() => setModalOpen(false)} />
      )}
    </div>
  )
}

type ModalProps = {
  title: string;
  content: string;
  onClose: () => void;
}
const Modal = ({title, content, onClose}: ModalProps) => {
  useLockBodyScroll();

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal">
        <h2>{title}</h2>
        <p>{content}</p>
      </div>
    </div>
  );
}
