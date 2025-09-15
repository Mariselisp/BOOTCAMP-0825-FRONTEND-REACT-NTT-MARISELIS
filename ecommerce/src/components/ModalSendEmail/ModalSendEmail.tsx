import './ModalSendEmail.css'

interface ModalProp {
  onClose: () => void;
}

export const ModalSendEmail = ({ onClose }: ModalProp) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Correo enviado exitosamente!</h2>     
                <button className="modal-button" onClick={onClose}>Cerrar</button>           
            </div>
        </div>
    );
}
