import '../Modal/Modal.css';

interface ModalProps {
  mensaje: string;
  onClose: () => void;
}

export const Modal = ({ mensaje, onClose }: ModalProps) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <p>{mensaje}</p>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};